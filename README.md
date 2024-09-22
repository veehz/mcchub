# MCCHub

This is a [Next.js](https://nextjs.org/) project.

## Deploy

Edit the `.env.local.example` file and rename it to `.env.local`.

Edit `src/data/config.js`.

### Firebase

#### Authentication

Enable Authentication and set up email and password login.

#### Realtime Database

Enable Realtime Database.

Rules: run `node src/helpers/firebaseRuleMaker.js` and copy the output into the rules.

#### Storage

Enable Cloud Storage. Cloud Storage is only used to store payment proofs.

Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /paymentProof/{userId}/{document} {
      allow read: if true
      allow create: if request.auth.uid == userId;
    }
  }
}
```

#### Update the Firebase config

Create a web app from Firebase.

Update the Firebase config in `/src/data/config.js`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
