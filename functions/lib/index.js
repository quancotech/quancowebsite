"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'quancotech'
});
exports.api = functions.https.onRequest(async (req, res) => {
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
        }
        catch (error) {
            console.error('Error submitting form:', error);
            let errorMessage = 'Failed to submit form. Please try again later.';
            if (error?.code === 'permission-denied') {
                errorMessage = 'Permission denied. Please check Firebase Firestore rules.';
            }
            else if (error?.code === 'unavailable') {
                errorMessage = 'Firebase service is temporarily unavailable. Please try again later.';
            }
            else if (error?.message) {
                errorMessage = error.message;
            }
            res.status(500).json({
                error: errorMessage,
                details: error?.code || 'unknown_error'
            });
        }
    }
    else {
        res.status(404).json({ error: 'Not found' });
    }
});
//# sourceMappingURL=index.js.map