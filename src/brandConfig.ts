import { Service, Staff, Holiday } from './types';

export const brandConfig = {
  name: "MIRA Remedial Thai Massage",
  description: "Traditional Thai healing meets modern clinical precision. Experience the art of massage in a sanctuary designed for your recovery.",
  location: "Level 1/76 Pier Street, Altona 3018",
  phone: "046699 2456",
  email: "miraremedial@gmail.com",
  logo: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2Flogo%20Mira%2FLogo%20-%20MIRA-02.jpg?alt=media&token=d907378d-34fa-4c09-be94-07f039855304",
  heroImage: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2F002.png?alt=media&token=f90793ff-d7a1-4b24-8d7e-db8687c1f848",
  promoVideo: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2FVDO%2FMix%20thai%20Mira.mp4?alt=media&token=f90bb37e-a707-4454-a841-90df3a73b771",
  colors: {
    primary: "#4A5D23", // Deep Moss Green
    secondary: "#C5A059", // Antique Gold
    background: "#FFFFFF",
    section: "#FAFAF5", // Soft Cream
    earth: "#2D2A26", // Dark Earth
    sage: "#8A9A5B", // Lighter Sage
  },
  services: [
    {
      id: "thai-relaxation-oil",
      name: "Thai Relaxation Combination with oil massage",
      description: "A perfect blend of traditional Thai stretching and soothing aromatherapy oil massage. This treatment uses long, rhythmic strokes to reduce stress and improve circulation. Ideal for those seeking pure relaxation and a recharge for the body and mind.",
      fullPrice: 90,
      depositAmount: 30,
      duration: 60,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800&h=600",
      rates: { "30": 60, "45": 75, "60": 90, "90": 130 },
      bestFor: "Stress relief & pure relaxation",
      keyBenefits: ["Stress Relief", "Gentle Stretching", "Aromatherapy"],
      category: 'Standard'
    },
    {
      id: "thai-deep-tissue-oil",
      name: "Thai Deep Tissue combination with oil massage",
      description: "Designed to target chronic muscle tension and \"knots\" (trigger points). By using oil to reduce friction, our therapists can apply deeper pressure to reach underlying muscle layers more effectively without over-sensitivity.",
      fullPrice: 95,
      depositAmount: 30,
      duration: 60,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800&h=600",
      video: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2FVDO%2FServiceRemedial_Massage%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%82%E0%B8%84%E0%B8%A5%E0%B8%AA.mp4?alt=media&token=daac29ce-443c-4811-8419-8dcc0d868db5",
      rates: { "30": 65, "45": 80, "60": 95, "90": 135 },
      bestFor: "Chronic muscle tension & knots",
      keyBenefits: ["Muscle Recovery", "Firm Pressure", "Tension Release"],
      category: 'Standard'
    },
    {
      id: "thai-massage-no-oil",
      name: "Thai Massage without oil",
      description: "The authentic \"dry\" Thai massage. This treatment focuses on acupressure and passive yoga-like stretching to open the body’s energy lines and improve flexibility. No oil is used, and you will feel lighter and more aligned.",
      fullPrice: 95,
      depositAmount: 30,
      duration: 60,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800&h=600",
      video: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2FVDO%2F%E0%B8%A7%E0%B8%B4%E0%B8%94%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%A7%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B9%82%E0%B8%A3%E0%B8%A1%E0%B9%88%E0%B8%B2.mp4?alt=media&token=ae08fc39-b5ce-4a73-a8ba-4601010c3c62",
      rates: { "30": 65, "45": 80, "60": 95, "90": 135 },
      bestFor: "Flexibility & traditional alignment",
      keyBenefits: ["Improved Flexibility", "Traditional Techniques", "Non-Greasy"],
      category: 'Standard'
    },
    {
      id: "accredited-oil",
      name: "Treatment by accredited therapist with oil massage (HICAPS)",
      description: "A clinical approach to massage therapy performed by a certified professional. This treatment focuses on addressing specific physical issues, such as neck and shoulder pain or posture-related stiffness, using therapeutic oils for a smooth, effective session.",
      fullPrice: 100,
      depositAmount: 40,
      duration: 60,
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800&h=600",
      video: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2FVDO%2F%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%A7%E0%B8%94_%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B5%E0%B8%A5%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B5_%E0%B8%A7%E0%B8%B4%E0%B8%94%E0%B8%B5%E0%B9%82%E0%B8%AD.mp4?alt=media&token=4d0f661b-2440-4e11-8e3a-35c1751668ab",
      rates: { "30": 70, "60": 100, "90": 150, "120": 200 },
      bestFor: "Specific",
      keyBenefits: ["Professional Therapy", "Targeted Healing", "Certified Care"],
      category: 'Remedial'
    },
    {
      id: "accredited-deep-tissue",
      name: "Treatment deep tissue by accredited therapist (HICAPS)",
      description: "(Our Signature Therapeutic Session) The highest level of clinical care. Our accredited therapists use deep tissue techniques to manage severe muscle tightness and structural imbalances, ensuring the most effective and comfortable deep-pressure experience.",
      fullPrice: 105,
      depositAmount: 40,
      duration: 60,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800&h=600",
      rates: { "30": 75, "60": 105, "90": 155, "120": 205 },
      bestFor: "Severe muscle tightness & structural imbalances",
      keyBenefits: ["Maximum Pain Relief", "Clinical Expertise", "Deep Muscle Alignment"],
      category: 'Remedial'
    }
  ] as Service[],
  staff: [
    {
      id: "therapist-male",
      name: "Male Therapist",
      role: "Professional Therapist",
      avatar: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FMira%20Thai%20Massage%2Fmel01.png?alt=media&token=7e7e11ff-82c6-4716-977d-cdbfedd2769b",
      specialties: ["Thai Traditional", "Deep Tissue", "Remedial"],
      status: 'Working',
      isAccredited: true,
      providerNumber: "PRV-M-12345"
    },
    {
      id: "therapist-female",
      name: "Female Therapist",
      role: "Professional Therapist",
      avatar: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=200&h=200",
      specialties: ["Thai Traditional", "Relaxation", "Remedial"],
      status: 'Working',
      isAccredited: true,
      providerNumber: "PRV-F-67890"
    }
  ] as Staff[],
  holidays: [
    {
      id: 'songkran-2026',
      startDate: '2026-04-13',
      endDate: '2026-04-15',
      message: 'Happy Songkran! We are closed for the Thai New Year festival.',
      type: 'holiday',
      isActive: true
    },
    {
      id: 'christmas-2026',
      startDate: '2026-12-25',
      endDate: '2026-12-26',
      message: 'Merry Christmas! We are closed for the holidays.',
      type: 'holiday',
      isActive: true
    }
  ] as Holiday[]
};
