import { NextApiRequest, NextApiResponse } from 'next/types';
import { authAdmin, firestoreAdmin } from '../../_firebase/firebase_admin'; 
import { SignalModel } from '../../models/model.signal'; 
import { AuthUserModel } from '../../models/model.authuser';  
import subDays from 'date-fns/subDays';
import { calcentrytime } from '../../utils/calc_entrytime';
import { fDateTimeSuffix } from '../../utils/format_time'; 
import { sendNotificationsToUsers } from '../../models_helpers/notifications_helpers';



let CountOfSignalListInApp = 10;
let Deleted_ClosedSignals = 70;

 //let firestoreClient: Firestore;
 
 const serverTimestamp = new Date(); // JavaScript's Date object for current timestamp

async function handler(req: NextApiRequest, res: NextApiResponse) {


 // console.log("Hello, World!"); 
//  if (req.method === 'POST') {
//   // Handle POST request
//   console.log(req.body);
//   res.status(200).json({ message: 'POST request body received' });
// } else if (req.method === 'GET') {
//   // Handle GET request
//   res.status(200).json({ message: 'GET request received' });
// } else {
//   // Handle any other HTTP methods
//   res.setHeader('Allow', ['GET', 'POST']);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }


async function apigetIsFreeSignalBotWithBadawits() {
  try { 
    const docRef = firestoreAdmin.collection('appControlsPublic').doc('appControlsPublic');
    const docSnapshot = await docRef.get();
  
    if (docSnapshot.exists) {
      const docData = docSnapshot.data();
  
      // Check if docData is defined
      if (docData) {
        isFreeSignalBot = docData.isEnableFreeSignalsBOT; 
        console.log("isfree:", isFreeSignalBot); // Outputs true or false based on the document data
      } else {
        console.log('docData is undefined.');
      }
    } else {
      console.log('Document does not exist.');
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    // Handle the error as needed
  }
  
  
}
  const Id = "A4LOoc0XMCPilVHP1z9uzPppi3z2";
  const email = "most106sult@gmail.com";
  const market = "forex";
  const isClosed = "false";
  const isAuto = "false";
  let isFreeSignalBot = false;

  const takeProfit1 = req.body.takeProfit1;
  const takeProfit2 = req.body.takeProfit2; 
  res.setHeader('Allow', ['GET', 'POST']);

  if (req.method === 'POST') {
    try {

    //   const fbUser = authClient.currentUser;
    // const fsuser = await apiGetUser(fbUser!.uid);
    // if (!fsuser) throw new Error('No user found!');
    
      const user = await authAdmin.getUser(Id); // UserRecord
      if (!user) return res.status(400).json({ error: 'User not found' });
      
     const user1 = await getUserById(Id); 
    if (!user1) throw new Error('A7a! :'+user.uid+' ~~ -! :'+user.email); 
    console.log("isAdmin :"+ user1.isAdmin+" Welcome my boy :"+user1.username);
 
    await apigetIsFreeSignalBotWithBadawits(); 

    let docPath = 'crypto';
    if (req.body.comment == "M1") docPath = 'forex';  

    if (req.body.symbol != ""){
    
 
    let s = new SignalModel();
  
      s.symbol = req.body.symbol || '';
      s.timeentryDateTime = calcentrytime( new Date());
      s.entryType = req.body.entryType || '';

      s.comment = req.body.comment || ''; 
      s.forecast = req.body.forecast || '';
      s.payout = req.body.payout || '';
      s.id = Id;
      s.market = market;
      s.winRat = req.body.result || '';
      s.isFree = isFreeSignalBot;
      s.isClosed = false;
      s.isAuto = false;
      s.entryDateTime = new Date();
     
      console.log("deal Oky");
      
       

      await apiCreateSignalWithSultan( user1 , s ,docPath ); 

      var iconupdown = s.entryType == 'Short' ? `🔽` : `🔼`;
      const timeString = s.timeentryDateTime!.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }); 
      
      await sendNotificationsToUsers({ title: `📈: ${s.symbol}`+` 🟢: ${req.body.comment}`, body: `${iconupdown}: ${req.body.entryType} ~ ⌛: ${timeString}` });

    } else if(req.body.result != ""){


      console.log("Start Win/Loss Place"); 
 
      const winRat_val = req.body.result || '';

      var takeProfit1Hit_val = false;
      var takeProfit2Hit_val = false;
      var takeProfit3Hit_val = false;
      var dojiHit_val = false;
      var stopLossHit_val = false; 

      var title_iconWinLoss = `🔥`;
      var iconWinLoss = `✅`;
      if(winRat_val == 'WIN 1'){
        iconWinLoss = `WIN ✅ 1`;
        takeProfit1Hit_val = true;
      } else if (winRat_val == 'WIN 2'){
        iconWinLoss = `WIN ✅ 2`;
        takeProfit2Hit_val = true;
      } else if (winRat_val == 'WIN 3'){
        iconWinLoss = `WIN ✅ 3`;
        takeProfit3Hit_val = true;
      } else if (winRat_val == 'Loss'){
        title_iconWinLoss = `💸`;
        iconWinLoss = `Loss 💔`;
        stopLossHit_val = true;
      } else if (winRat_val == 'Doji'){
        iconWinLoss = `DOJI ⚖️`;
        dojiHit_val = true;
      }
 

      console.log("takeProfit1Hit :"+takeProfit1Hit_val); 
      console.log("takeProfit2Hit :"+takeProfit2Hit_val); 
      console.log("takeProfit3Hit :"+takeProfit3Hit_val); 
      console.log("dojiHit_val :"+dojiHit_val); 
      console.log("stopLossHit :"+stopLossHit_val); 
 
      await apiWinRate(docPath,winRat_val,takeProfit1Hit_val,takeProfit2Hit_val,takeProfit3Hit_val,stopLossHit_val,dojiHit_val);

    

      await sendNotificationsToUsers({ title: `${title_iconWinLoss}`+` 🟢: ${req.body.comment}`, body: `${iconWinLoss}` });
  
        
       

    }

    

    // await apiCloseTheLastOpen();
    await apiCloseTheLastOpenOf(docPath );
    await deleteOldClosedDocuments(docPath);


   const sendNotification = true;
   const id = "YMUWk4jtdafw9WirZ60qPKxwjJL2"; 

      res.status(200).json({ message: 'Signal added to signalsForex' });
    } catch (error: any) {
      res.status(500).json({ message:"handler_error_1"+ error.message });
    }
  } else {
    
    res.status(405).json({ error: 'Method not allowed' });
  } 
}



async function apiWinRate(docPath : string,winRat_val : String,takeProfit1Hit_val : boolean ,takeProfit2Hit_val : boolean ,takeProfit3Hit_val : boolean ,stopLossHit_val :boolean ,dojiHit_val : boolean ) {
  try {
     
let dbPath = 'signalsForex'; 
if(docPath == 'crypto') dbPath = 'signalsCrypto';

    const docRefAggr = firestoreAdmin.collection('signalsAggrOpen').doc(docPath);

    const docSnapshot = await docRefAggr.get();

    if (docSnapshot.exists) {
      const docData = docSnapshot.data() as any;
      let dataArray = docData.data;
       

    // Check if dataArray is an array and has more than three elements
    if (Array.isArray(dataArray) && dataArray.length >= 1) {
      dataArray[0].id;

      

        //catch error no winrate empty there for doc count == 0
        const docRef = firestoreAdmin.collection(dbPath).doc(dataArray[0].id);
        docRef.update({ 
          takeProfit1Hit: takeProfit1Hit_val
          ,takeProfit2Hit: takeProfit2Hit_val
          ,takeProfit3Hit: takeProfit3Hit_val
          ,stopLossHit: stopLossHit_val
          ,dojiHit: dojiHit_val
          ,winRat: winRat_val
        });
        
    const docRefAggr = firestoreAdmin.collection('signalsAggrOpen').doc(docPath);
    
      const docSnapshot = await docRefAggr.get();
    
      if (docSnapshot.exists) {
        const docData = docSnapshot.data() as any;
        let dataArray = docData.data; // This is your array of maps
    
        // Find the map with the specific id
        const mapIndex = dataArray.findIndex((map: any) => map.id === dataArray[0].id);
    
        if (mapIndex !== -1) {
          // Update winRat field
          dataArray[mapIndex].takeProfit1Hit = takeProfit1Hit_val;
          dataArray[mapIndex].takeProfit2Hit = takeProfit2Hit_val;
          dataArray[mapIndex].takeProfit3Hit = takeProfit3Hit_val;
          dataArray[mapIndex].stopLossHit = stopLossHit_val;
          dataArray[mapIndex].dojiHit = dojiHit_val;
          dataArray[mapIndex].winRat = winRat_val;
    
          // Update the document with the modified array
          await docRefAggr.update({ data: dataArray });
          console.log('Document successfully updated.');
        } else {
          console.log('No map with the specified id found.');
        }
      } else {
        console.log('Document does not exist.');
      }
  
 
    } else {
      console.log('Array is not long enough or not an array.');
    }
    


    } else {
      console.log('Document does not exist.');
    }

  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error; // or handle the error as needed
  }
}
async function deleteOldClosedDocuments(docPath :string) {

  let dbPath = 'signalsForex'; 
  if(docPath == 'crypto') dbPath = 'signalsCrypto';
  
  try {
    const collectionRef = firestoreAdmin.collection(dbPath);
    
    // Query to fetch closed documents sorted by timestampClosed
    const querySnapshot = await collectionRef
      .where('isClosed', '==', true)
      .orderBy('timestampClosed', 'desc') // assuming 'timestampClosed' is the field name
      .get();

    let count = 0;

    querySnapshot.forEach(doc => {
      count++;
      if (count > Deleted_ClosedSignals) {
        // Delete closed signals older than the last 10
        doc.ref.delete().catch(error => console.error("Error deleting document:", error));
      }
    });

  } catch (error) {
    console.error("Error in deleteOldClosedDocuments:", error);
    throw error;
  }
}


async function apiCloseTheLastOpenOf(docPath : string) {
  try {
     
    let dbPath = 'signalsForex'; 
    if(docPath == 'crypto') dbPath = 'signalsCrypto';

    const docRefAggr = firestoreAdmin.collection('signalsAggrOpen').doc(docPath);

    const docSnapshot = await docRefAggr.get();

    if (docSnapshot.exists) {
      const docData = docSnapshot.data() as any;
      let dataArray = docData.data;

    // Check if dataArray is an array and has more than three elements
    if (Array.isArray(dataArray) && dataArray.length > CountOfSignalListInApp) {
      // Slice the array to get elements from the fourth index onwards
      const idsFromFourthIndex = dataArray.slice(CountOfSignalListInApp).map(item => item.id);

      // idsFromFourthIndex now contains all 'Id's from the fourth index onwards
      // Process these Ids as needed
      console.log(idsFromFourthIndex);

      idsFromFourthIndex.forEach(async element => {
        
      await deleteMapInDocument_forexAggrigation(element,docPath);

        try { 
          // const docRef = firestoreAdmin.collection('signalsForex').doc(element.id);
        
          // await docRef.delete();
        
  const docRef = firestoreAdmin.collection(dbPath).doc(element);
  await docRef.update({ 
    isClosed: true ,
    timestampClosed: new Date 
  });

          console.log(`Document with ID ${element} has been successfully deleted.`);
        } catch (error) {
          console.error("Error deleting document:", error);
          throw error;
        }
      });
    } else {
      console.log('Array is not long enough or not an array.');
    }
    


    } else {
      console.log('Document does not exist.');
    }

  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error; // or handle the error as needed
  }
} 

async function deleteMapInDocument_forexAggrigation(forex_ID : String,docPath : string) {
  
  try {
    const docRefAggr = firestoreAdmin.collection('signalsAggrOpen').doc(docPath);

    const docSnapshot = await docRefAggr.get();

    if (docSnapshot.exists) {
      const docData = docSnapshot.data() as any;
      let dataArray = docData.data;

      const mapIndex = dataArray.findIndex((map: any) => map.id === forex_ID);

      if (mapIndex !== -1) {
        // Remove the map from the array
        dataArray.splice(mapIndex, 1);

        // Update the document with the modified array
        await docRefAggr.update({ data: dataArray });
        console.log('Map successfully deleted from the document.');
      } else {
        console.log('No map with the specified id found.');
      }
    } else {
      console.log('Document does not exist.');
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
}




export default handler;
 
async function getUserById(id: string) {
  const userRef = firestoreAdmin.collection('users').doc(id); // Directly use firestoreAdmin to get the document reference 
  const userDoc = await userRef.get(); // Get the document

  if (!userDoc.exists) {
      console.log('No such document!');
      return null;
  }

  const userData = userDoc.data();
  if (!userData) return null;

  return AuthUserModel.fromJson({
      ...userData,
      id: userDoc.id, 
      timestampCreated: userDoc.data()!.timestampCreated?.toDate(),
      timestampUpdated: userDoc.data()!.timestampUpdated?.toDate(),
      subIsLifetimeEndDate: userDoc.data()!.subIsLifetimeEndDate?.toDate(),
      subRevenueCatBillingIssueDetectedAt: userDoc.data()!.subRevenueCatBillingIssueDetectedAt?.toDate(),
      subRevenueCatOriginalPurchaseDate: userDoc.data()!.subRevenueCatOriginalPurchaseDate?.toDate(),
      subRevenueCatLatestPurchaseDate: userDoc.data()!.subRevenueCatLatestPurchaseDate?.toDate(),
      subRevenueCatExpirationDate: userDoc.data()!.subRevenueCatExpirationDate?.toDate(),
      subRevenueCatUnsubscribeDetectedAt: userDoc.data()!.subRevenueCatUnsubscribeDetectedAt?.toDate(),
      subStripeStart: userDoc.data()!.subStripeStart?.toDate(),
      subStripeEnd: userDoc.data()!.subStripeEnd?.toDate(),
      subSubscriptionEndDate: userDoc.data()!.subSubscriptionEndDate?.toDate()
  });
}
 
export async function apiCreateSignalWithSultan( user: AuthUserModel  , signal: SignalModel , docPath: String): Promise<boolean | undefined> {
  if (!signal) throw new Error('No signal provided!');
  try {  
     
    if (!user) throw new Error('No user found!');
    if (!user.isSuperAdmin! && !user.isAdmin) throw new Error('You are not authorized to create signals.');


    // await addDoc(collection(firestoreClient, 'signalsForex'), {
    //   ...SignalModel.toJson(signal),
    //   timestampCreated: serverTimestamp(),
    //   timestampUpdated: serverTimestamp(),
    //   timestampLastAutoCheck: serverTimestamp()
    // });

    await addNewSignal(signal,docPath);

    await apiAggregateSignals(docPath);
    await apiSignalAggrPerfromance(docPath);
 
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function addNewSignal(signal: SignalModel , docPath: String) {
  try {
    const signalData = {
      ...SignalModel.toJson(signal),
      timestampCreated: serverTimestamp,
      timestampUpdated: serverTimestamp,
      timestampLastAutoCheck: serverTimestamp
    };

    let dbPath = 'signalsForex'; 
    if(docPath == 'crypto') dbPath = 'signalsCrypto';
    const docRef = await firestoreAdmin.collection(dbPath).add(signalData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // or handle the error as needed
  }
}

export async function apiAggregateSignals(docPath: String): Promise<boolean | undefined> {
  try {
    const signals = await apiGetSignalsOpen(docPath);
    const data = signals.map((signal) => {
      return SignalModel.toJson(signal);
    });
 
    // let docPath = 'crypto';
    // if (dbPath === 'signalsForex') docPath = 'forex';
    // if (dbPath === 'signalsStocks') docPath = 'stocks';

    
    // let dbPath = 'signalsForex'; 
    // if(docPath == 'crypto') dbPath = 'signalsCrypto';

    const hasData = data.length > 0;
    // await setDoc(doc(firestoreClient, 'signalsAggrOpen', 'forex'), { data, hasData, timestampUpdated: serverTimestamp }, { merge: true });
    const docRef = firestoreAdmin.doc('signalsAggrOpen/'+docPath);
    await docRef.set(
      { data, hasData, timestampUpdated: serverTimestamp },
      { merge: true }
    );

    return true;
  } catch (error: any) {
    console.log("apiAggregateSignals_1"+error);
    throw new Error("apiAggregateSignals_1"+error.message);
  }
}
 
export async function apiGetSignalsOpen(docPath: String): Promise<SignalModel[]> {
  try {
    // const x = await getDocs(query(collection(firestoreClient, 'signalsForex'), where('isClosed', '==', false)));
    const x = await getUnclosedDocuments(docPath);
    
    const vals = x.map((doc) => SignalModel.fromJson({ ...doc.data, id: doc.id }));
 
    // sort by getEntryDateTime decs
    return vals.sort((a, b) => (a.getEntryDateTime > b.getEntryDateTime ? -1 : 1));
  } catch (error) {
    console.log("apiGetSignalsOpen_1"+error);
    return [];
  }
}


async function getUnclosedDocuments(docPath: String) {
  
let dbPath = 'signalsForex'; 
if(docPath == 'crypto') dbPath = 'signalsCrypto';

  try {
    
    const collectionRef = firestoreAdmin.collection(dbPath);
    const querySnapshot = await collectionRef.where('isClosed', '==', false).get(); 
 
    var documents: { id: string; data: SignalModel; }[] = [];
 
    querySnapshot.forEach(doc => {

      const data = doc.data() as SignalModel; // Cast the document data to your type 
      documents.push({ id: doc.id, data: data }); // Push the document's ID and data into the array
    });

    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error; // or handle the error as needed
  }
}


export async function apiSignalAggrPerfromance(docPath: String): Promise<boolean> {
  try {
    const days30Ago = subDays(new Date(), 30);


    let dbPath = 'signalsForex'; 
    if(docPath == 'crypto') dbPath = 'signalsCrypto';

    // const x = await getDocs(query(collection(firestoreClient, 'signalsForex'), where('entryDateTime', '>', days30Ago)));

    const collectionRef = firestoreAdmin.collection(dbPath);
    const querySnapshot = await collectionRef.where('entryDateTime', '>', days30Ago).get();

    var documents: { id: string; data: SignalModel; }[] = [];
 
    querySnapshot.forEach(doc => {

      const data = doc.data() as SignalModel; // Cast the document data to your type 
      documents.push({ id: doc.id, data: data }); // Push the document's ID and data into the array
    });


    const x = documents;

 
    let signals30Days = x.map((doc) => SignalModel.fromJson({ ...doc.data, id: doc.id })); 
    signals30Days = signals30Days.filter((signal) => signal.takeProfit1DateTime || signal.stopLossDateTime);

    const signals14Days = signals30Days.filter((signal) => signal.getEntryDateTime > subDays(new Date(), 14));
    const signals7Days = signals30Days.filter((signal) => signal.getEntryDateTime > subDays(new Date(), 7));

    const trades30Days = signals30Days.length;
    const trades14Days = signals14Days.length;
    const trades7Days = signals7Days.length;

    const wins30Days = signals30Days.filter((signal) => signal.takeProfit1Hit).length;
    const wins14Days = signals14Days.filter((signal) => signal.takeProfit1Hit).length;
    const wins7Days = signals7Days.filter((signal) => signal.takeProfit1Hit).length;

    const winRate30Days = trades30Days > 0 ? wins30Days / trades30Days : 0;
    const winRate14Days = trades14Days > 0 ? wins14Days / trades14Days : 0;
    const winRate7Days = trades7Days > 0 ? wins7Days / trades7Days : 0;

    const performance7Days = { trades: trades7Days, profitPercentPerTrade: 0, wins: wins7Days, winRate: winRate7Days };
    const performance14Days = { trades: trades14Days, profitPercentPerTrade: 0, wins: wins14Days, winRate: winRate14Days };
    const performance30Days = { trades: trades30Days, profitPercentPerTrade: 0, wins: wins30Days, winRate: winRate30Days };
 
    
    const docRef = firestoreAdmin.doc('signalsAggrOpen/'+docPath);
    await docRef.set(
      { performance7Days, performance14Days, performance30Days, timestampUpdated: serverTimestamp },
      { merge: true }
    );

    // await setDoc(
    //   doc(firestoreClient, 'signalsAggrOpen', 'forex'),
    //   { performance7Days, performance14Days, performance30Days, timestampUpdated: serverTimestamp() },
    //   { merge: true }
    // );

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}




