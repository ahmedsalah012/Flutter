import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AppControlsPublicModel } from '../models/model.app_controls';

import { authClient, firestoreClient } from '../_firebase/firebase_client';
import { apiGetUser } from './firestore_user_service';

export async function apiUpdateAppControlsPublic(x: AppControlsPublicModel): Promise<boolean> {
  let appControls = { ...AppControlsPublicModel.toJson(x) };
  delete appControls.id;
  delete appControls.apiHasAccess;
  delete appControls.apiInfo;
  delete appControls.apiWebSocketUrl;

  try {
    const fbUser = authClient.currentUser; 
    const user = await apiGetUser(fbUser!.uid);
    if (!user) throw new Error('No user found!');
    if (!user.isSuperAdmin && !user.isAdmin) throw new Error('You are not authorized to update terms settings.');

    await setDoc(doc(firestoreClient, 'appControlsPublic', 'appControlsPublic'), { ...appControls }, { merge: true });

    await setDoc(
      doc(firestoreClient, 'signalsAggrOpen', 'crypto'),
      { isEnabled: appControls.isEnabledCryptoSignals, sort: appControls.sortOrderCryptoSignals, name: appControls.headingNameCrypto },
      { merge: true }
    );

    await setDoc(
      doc(firestoreClient, 'signalsAggrOpen', 'forex'),
      { isEnabled: appControls.isEnabledForexSignals, sort: appControls.sortOrderForexSignals, name: appControls.headingNameForex },
      { merge: true }
    );

    await setDoc(
      doc(firestoreClient, 'signalsAggrOpen', 'stocks'),
      { isEnabled: appControls.isEnabledStocksSignals, sort: appControls.sortOrderStocksSignals, name: appControls.headingNameStocks },
      { merge: true }
    );

    await setDoc(
      doc(firestoreClient, 'signalsAggrOpen2', 'global'),
      { isEnabled: appControls.isEnabledGlobalSignals, sort: appControls.sortOrderGlobalSignals, name: appControls.headingNameGlobal },
      { merge: true }
    );

    await setDoc(
      doc(firestoreClient, 'signalsAggrOpen2', 'otc'),
      { isEnabled: appControls.isEnabledOTCSignals, sort: appControls.sortOrderOTCSignals, name: appControls.headingNameOTC },
      { merge: true }
    );

    await setDoc(doc(firestoreClient, 'newsAggr', 'crypto'), { isEnabled: appControls.isEnabledCryptoNews }, { merge: true });
    await setDoc(doc(firestoreClient, 'newsAggr', 'forex'), { isEnabled: appControls.isEnabledForexNews }, { merge: true });
    await setDoc(doc(firestoreClient, 'newsAggr', 'stocks'), { isEnabled: appControls.isEnabledStocksNews }, { merge: true });
    await setDoc(doc(firestoreClient, 'newsAggr', 'global'), { isEnabled: appControls.isEnabledGlobalNews }, { merge: true });
    await setDoc(doc(firestoreClient, 'newsAggr', 'otc'), { isEnabled: appControls.isEnabledOTCNews }, { merge: true });



    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function apiUpdateAppControlsPublicLinks(x: AppControlsPublicModel): Promise<boolean> {
  let appControlsLinks = { ...AppControlsPublicModel.toJsonLinks(x) };

  try {
    const fbUser = authClient.currentUser;
    const user = await apiGetUser(fbUser!.uid);
    if (!user) throw new Error('No user found!');
    if (!user.isSuperAdmin && !user.isAdmin) throw new Error('You are not authorized to update terms settings.');

    await setDoc(doc(firestoreClient, 'appControlsPublic', 'appControlsPublic'), { ...appControlsLinks }, { merge: true });

    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function apiGetAppControlsPublic(): Promise<AppControlsPublicModel | null> {
  try {
    const appControls = await getDoc(doc(firestoreClient, 'appControlsPublic', 'appControlsPublic'));

    return AppControlsPublicModel.fromJson({ ...appControls.data(), id: appControls.id });
  } catch (error) {
    return null;
  }
}
