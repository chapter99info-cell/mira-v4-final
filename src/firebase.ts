import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Cache to prevent duplicate getDownloadURL calls
const urlCache = new Map<string, string>();

export async function resolveGsUrl(gsUrl: string): Promise<string> {
  if (!gsUrl || !gsUrl.startsWith('gs://')) {
    return gsUrl;
  }
  
  if (urlCache.has(gsUrl)) {
    return urlCache.get(gsUrl)!;
  }

  try {
    // Parse gsUrl: gs://bucket-name/path/to/file
    const match = gsUrl.match(/^gs:\/\/([^\/]+)\/(.+)$/);
    if (!match) return gsUrl;

    const bucketName = match[1];
    const path = match[2];

    // Initialize custom storage if bucket is different, else use default storage
    const bucketStorage = bucketName === firebaseConfig.storageBucket
      ? storage
      : getStorage(app, `gs://${bucketName}`);

    const fileRef = ref(bucketStorage, path);
    const resolvedUrl = await getDownloadURL(fileRef);
    urlCache.set(gsUrl, resolvedUrl);
    return resolvedUrl;
  } catch (error) {
    console.error('Failed to resolve Firebase Storage GS URL:', error);
    return gsUrl;
  }
}

export function useFirebaseUrl(url: string | undefined): string {
  const [resolved, setResolved] = useState<string>(url || '');

  useEffect(() => {
    if (!url) {
      setResolved('');
      return;
    }
    if (!url.startsWith('gs://')) {
      setResolved(url);
      return;
    }

    let isMounted = true;
    resolveGsUrl(url).then(resolvedUrl => {
      if (isMounted) {
        setResolved(resolvedUrl);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return resolved;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration. The client is offline.");
    }
  }
}
testConnection();
