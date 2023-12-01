import { NextApiRequest, NextApiResponse } from 'next/types';
import { authAdmin, firestoreAdmin } from '../../_firebase/firebase_admin';
// import { withAuth } from '../../_firebase/firebase_admin_auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = "YMUWk4jtdafw9WirZ60qPKxwjJL2";
  const email = "most106sult@gmail.com";
  
  // Extracting data from the request body
  const comment = req.body.comment || ''; 
  const entryDateTime = req.body.entryDateTime || new Date().toISOString();
  const entryType = req.body.entryType; // 'Long' for 'call' and 'Short' for 'put'
  const market = "forex";
  const symbol = req.body.symbol;
  const takeProfit1 = req.body.takeProfit1;
  const takeProfit2 = req.body.takeProfit2; 

  if (req.method === 'POST') {
    try {
      const user = await authAdmin.getUser(userId);
      if (!user) return res.status(400).json({ error: 'User not found' });

      // Creating a new document in the signalsForex collection
      const newSignal = {
        userId,
        email,
        comment,
        entryDateTime,
        entryType,
        market,
        symbol,
        takeProfit1,
        takeProfit2,
        createdAt: new Date()
      };
      await firestoreAdmin.collection('signalsForex').add(newSignal);

  //    res.status(200).json({ message: 'Signal added to signalsForex' });
    } catch (error: any) {
  //    res.status(500).json({ message: error.message });
    }
  } else {
 //   res.status(405).json({ error: 'Method not allowed' });
  }
}

// export default withAuth(handler);
