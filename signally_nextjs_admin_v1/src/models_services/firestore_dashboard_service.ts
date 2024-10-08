import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { DashboardModel } from '../models/model.dashboard';
import { firestoreClient } from '../_firebase/firebase_client';

export async function apiGetDashboardAggregation(): Promise<DashboardModel> {
  try {
    const collusers = query(collection(firestoreClient, 'users'));
    const usersSnapshot = await getCountFromServer(collusers);
    const totalUsers = usersSnapshot.data().count;

    const collVideoLessons = query(collection(firestoreClient, 'videoLessons'), where('status', '==', 'Published'));
    const videoLessonsSnapshot = await getCountFromServer(collVideoLessons);
    const totalVideoLessons = videoLessonsSnapshot.data().count;

    const collVideoLessonsAutocopy = query(collection(firestoreClient, 'videoLessons'), where('status', '==', 'autocopy'));
    const videoLessonsSnapshotAutocopy = await getCountFromServer(collVideoLessonsAutocopy);
    const totalVideoLessonsAutocopy = videoLessonsSnapshotAutocopy.data().count;

    const collAnnouncements = query(collection(firestoreClient, 'announcements'));
    const announcementsSnapshot = await getCountFromServer(collAnnouncements);
    const totalAnnouncements = announcementsSnapshot.data().count;

    const collSignalsForexOpen = query(collection(firestoreClient, 'signalsForex'), where('isClosed', '==', false));
    const signalsForexSnapshotOpen = await getCountFromServer(collSignalsForexOpen);
    const totalSignalsForexOpen = signalsForexSnapshotOpen.data().count;

    const collSignalsForexClosed = query(collection(firestoreClient, 'signalsForex'), where('isClosed', '==', true));
    const signalsForexSnapshotClosed = await getCountFromServer(collSignalsForexClosed);
    const totalSignalsForexClosed = signalsForexSnapshotClosed.data().count;

    const collSignalsCryptoOpen = query(collection(firestoreClient, 'signalsCrypto'), where('isClosed', '==', false));
    const signalsCryptoSnapshotOpen = await getCountFromServer(collSignalsCryptoOpen);
    const totalSignalsCryptoOpen = signalsCryptoSnapshotOpen.data().count;

    const collSignalsCryptoClosed = query(collection(firestoreClient, 'signalsCrypto'), where('isClosed', '==', true));
    const signalsCryptoSnapshotClosed = await getCountFromServer(collSignalsCryptoClosed);
    const totalSignalsCryptoClosed = signalsCryptoSnapshotClosed.data().count;

    const collSignalsStocksOpen = query(collection(firestoreClient, 'signalsStocks'), where('isClosed', '==', false));
    const signalsStocksSnapshotOpen = await getCountFromServer(collSignalsStocksOpen);
    const totalSignalsStocksOpen = signalsStocksSnapshotOpen.data().count;

    const collSignalsStocksClosed = query(collection(firestoreClient, 'signalsStocks'), where('isClosed', '==', true));
    const signalsStocksSnapshotClosed = await getCountFromServer(collSignalsStocksClosed);
    const totalSignalsStocksClosed = signalsStocksSnapshotClosed.data().count;

    const collSignalsGlobalOpen = query(collection(firestoreClient, 'signalsGlobal'), where('isClosed', '==', false));
    const signalsGlobalSnapshotOpen = await getCountFromServer(collSignalsGlobalOpen);
    const totalSignalsGlobalOpen = signalsGlobalSnapshotOpen.data().count;

    const collSignalsGlobalClosed = query(collection(firestoreClient, 'signalsGlobal'), where('isClosed', '==', true));
    const signalsGlobalSnapshotClosed = await getCountFromServer(collSignalsGlobalClosed);
    const totalSignalsGlobalClosed = signalsGlobalSnapshotClosed.data().count;

    const collSignalsOTCOpen = query(collection(firestoreClient, 'signalsOTC'), where('isClosed', '==', false));
    const signalsOTCSnapshotOpen = await getCountFromServer(collSignalsOTCOpen);
    const totalSignalsOTCOpen = signalsOTCSnapshotOpen.data().count;

    const collSignalsOTCClosed = query(collection(firestoreClient, 'signalsOTC'), where('isClosed', '==', true));
    const signalsOTCSnapshotClosed = await getCountFromServer(collSignalsOTCClosed);
    const totalSignalsOTCClosed = signalsOTCSnapshotClosed.data().count;

    const collPosts = query(collection(firestoreClient, 'posts'));
    const postsSnapshot = await getCountFromServer(collPosts);
    const totalPosts = postsSnapshot.data().count;

    return DashboardModel.fromJson({
      totalUsers,
      totalVideoLessons,
      totalVideoLessonsAutocopy,
      totalAnnouncements,
      totalSignalsForexOpen,
      totalSignalsForexClosed,
      totalSignalsStocksOpen,
      totalSignalsStocksClosed,
      totalSignalsCryptoOpen,
      totalSignalsCryptoClosed,
      totalSignalsGlobalOpen,
      totalSignalsGlobalClosed,
      totalSignalsOTCOpen,
      totalSignalsOTCClosed,
      totalPosts
    });
  } catch (error) {
    return DashboardModel.fromJson({});
  }
}
