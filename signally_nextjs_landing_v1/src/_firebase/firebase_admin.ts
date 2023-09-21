import * as admin from 'firebase-admin';

export const firebaseConfigServer = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined
};

const app = getApp();

let authAdmin: admin.auth.Auth = admin.auth(app);
let firestoreAdmin: admin.firestore.Firestore = admin.firestore(app);

function getApp() {
  if (admin.apps.length > 0) return admin.apps[0]!;

  return admin.initializeApp({
    credential: admin.credential.cert(firebaseConfigServer)
  });
}

export { firestoreAdmin, authAdmin };
