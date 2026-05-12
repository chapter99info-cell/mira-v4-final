const SPREADSHEET_ID = '1uDd3p3cuyWjO6YNia504RFlSLY_JFk93m5_FIvEpbrM';
// TODO: Replace this FOLDER_ID with your actual Google Drive folder ID
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID'; 

function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('Mira Receipt Portal')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Check PIN against 'Providers' tab (Assuming PIN is in Column E, index 4)
function verifyPin(pin) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Providers');
  const data = sheet.getDataRange().getValues();

  // ตรวจสอบ Master Key ของพี่แสนก่อน
  if (pin === "3501") {
    return { role: "SuperAdmin", name: "P'Saen" };
  }

  // Name(0), pNo(1), ABN(2), sigUrl(3), PIN(4), Role(5)
  const providerRow = data.slice(1).find(r => r[4] == pin);
  
  if (providerRow) {
    return { 
      name: providerRow[0], 
      pNo: providerRow[1], 
      abn: providerRow[2], 
      sigUrl: providerRow[3],
      role: providerRow[5] || 'Staff'
    };
  }
  return { role: "Unauthorized" };
}

function getProvidersAdmin() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Providers');
  return sheet.getDataRange().getValues().slice(1);
}

function addProvider(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Providers');
  
  // เพิ่มข้อมูลใหม่ลงในแถวถัดไป (Name, ProviderNo, ABN, SigUrl, PIN, Role)
  sheet.appendRow([data.name, data.providerNo, '69695654034', '', data.pin, 'Staff']);
  
  return { success: true };
}

function updateProvider(oldName, name, pNo, abn, sigUrl, pin, role) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Providers');
  const data = sheet.getDataRange().getValues();
  const index = data.findIndex(r => r[0] == oldName);
  if(index > -1) {
    sheet.getRange(index + 1, 1, 1, 6).setValues([[name, pNo, abn, sigUrl, pin, role]]);
  }
  return { success: true };
}

function deleteProvider(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Providers');
  const data = sheet.getDataRange().getValues();
  const index = data.findIndex(r => r[0] == name);
  if(index > -1) {
    sheet.deleteRow(index + 1);
  }
  return { success: true };
}

function getReceiptHistory() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Receipts');
  return sheet.getDataRange().getValues().slice(1);
}

function processReceipt(formData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const receiptSheet = ss.getSheetByName('Receipts');
  
  // Verify Provider
  const provider = verifyPin(formData.pin);
  if (!provider || provider.role === 'Unauthorized') {
    throw new Error('รหัส PIN ไม่ถูกต้อง!');
  }

  // Generate Receipt No
  const timestamp = new Date();
  const lastRow = receiptSheet.getLastRow();
  const newId = (lastRow < 2) ? 1 : lastRow;
  const receiptNo = `WI-${timestamp.getFullYear()}-${String(newId).padStart(4, '0')}`;

  // Prepare Template and PDF
  const template = HtmlService.createTemplateFromFile('template');
  template.Client_Name = formData.clientName;
  template.Receipt_No = receiptNo;
  template.Date = timestamp.toLocaleDateString();
  template.Amount = formData.amount;
  template.Therapist_Name = provider.name === "P'Saen" ? "Monsicha Chayakornkrajohnkul" : provider.name;
  template.Provider_No = provider.pNo || "A348132F";
  template.ABN = provider.abn || "69695654034";
  template.Signature_URL = provider.sigUrl;
  
  const htmlContent = template.evaluate().getContent();
  
  // Generate PDF (Using temporary Doc approach for reliability)
  var doc = DocumentApp.create('Receipt_' + receiptNo);
  doc.getBody().appendHtml(htmlContent);
  doc.saveAndClose();
  const pdf = DriveApp.getFileById(doc.getId()).getAs('application/pdf')
    .setName(`${receiptNo}_${formData.clientName}.pdf`);
  
  // Save to Drive
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const file = folder.createFile(pdf);
  
  // Clean up temp doc
  DriveApp.getFileById(doc.getId()).setTrashed(true);
  
  // Send Email
  MailApp.sendEmail({
    to: formData.clientEmail,
    subject: `Your Health Fund Receipt from Mira Thai Massage`,
    body: `Hi ${formData.clientName},\n\nThank you for visiting Mira Remedial Thai Massage. Please find your receipt attached.`,
    attachments: [file],
    name: "Mira Remedial Thai Massage"
  });

  // Log to Sheet
  receiptSheet.appendRow([timestamp, receiptNo, formData.clientName, formData.clientEmail, timestamp.toLocaleDateString(), provider.name, formData.amount, 'Sent']);
  
  return { success: true, receiptNo: receiptNo };
}

function syncOfflineData(dataArray) {
  return dataArray.map(data => {
    try {
      return processReceipt(data);
    } catch (e) {
      return { success: false, error: e.toString() };
    }
  });
}
