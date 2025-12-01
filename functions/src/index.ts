import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  projectId: process.env.GCLOUD_PROJECT || 'quancotech'
});

export const api = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Handle contact form submission
  if (req.path === '/contact' && req.method === 'POST') {
    try {
      const { name, email, service, meetingDate, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        res.status(400).json({
          error: 'Name, email, and message are required'
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: 'Invalid email format'
        });
        return;
      }

      // Add document to Firestore
      const db = admin.firestore();
      const docRef = await db.collection('contactSubmissions').add({
        name: name.trim(),
        email: email.trim(),
        service: service || '',
        meetingDate: meetingDate || '',
        message: message.trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'new'
      });

      res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        id: docRef.id
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to submit form. Please try again later.';
      
      if (error?.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firebase Firestore rules.';
      } else if (error?.code === 'unavailable') {
        errorMessage = 'Firebase service is temporarily unavailable. Please try again later.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      res.status(500).json({
        error: errorMessage,
        details: error?.code || 'unknown_error'
      });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

