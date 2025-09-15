const admin = require("firebase-admin");
const fs = require("fs");

// Load service account key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get Firestore reference
const db = admin.firestore();

// Read JSON data
const doctors = JSON.parse(fs.readFileSync("doctors.json", "utf8"));

// Upload each doctor to "doctors" collection
doctors.forEach(async (doc, index) => {
  try {
    await db.collection("doctors").doc(doc.id.toString()).set(doc);
    console.log(`Uploaded (${index + 1}): ${doc.name}`);
  } catch (error) {
    console.error(`Error uploading ${doc.name}:`, error);
  }
});
