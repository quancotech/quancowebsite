# Firebase Hosting Deployment Guide

## Prerequisites
1. Firebase CLI is installed (already installed: v13.35.1)
2. You're logged into Firebase (project: quancotech)

## Deployment Steps

### 1. Login to Firebase (if not already logged in)
```bash
firebase login
```

### 2. Install Functions Dependencies
```bash
cd functions
npm install
cd ..
```

### 3. Build the Next.js App
```bash
npm run build
```
This will create an `out` folder with static files.

### 4. Build Firebase Functions
```bash
cd functions
npm run build
cd ..
```

### 5. Deploy to Firebase
```bash
firebase deploy
```

Or deploy only hosting:
```bash
firebase deploy --only hosting
```

Or deploy only functions:
```bash
firebase deploy --only functions
```

## Configuration Files Created

- `.firebaserc` - Firebase project configuration
- `firebase.json` - Firebase hosting and functions configuration
- `functions/` - Firebase Functions for API routes
- `next.config.js` - Updated for static export

## Important Notes

1. **API Routes**: The contact form API (`/api/contact`) is now handled by Firebase Functions
2. **Static Export**: Next.js is configured for static export (`output: 'export'`)
3. **Firestore Rules**: Make sure your Firestore rules allow writes to `contactSubmissions` collection

## Troubleshooting

If you encounter build errors:
- Check TypeScript errors in the build output
- Ensure all dependencies are installed
- Verify Firebase project ID matches in `.firebaserc`

## After Deployment

Your site will be available at:
- `https://quancotech.web.app`
- `https://quancotech.firebaseapp.com`

You can also set up a custom domain in Firebase Console.

