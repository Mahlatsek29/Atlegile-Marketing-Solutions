const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const admin = require("firebase-admin");

const serviceAccount = require("./atlegileKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
// Configure CORS options
const corsOptions = {
    origin: "https://sowheretoaccess.com", // Replace with the actual origin you want to allow
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// const db = admin.firestore();

/**
 * Generates a request hash
 *  based on the provided Ozow data.
 *
 * @param {Object} ozowData - The Ozow data object
 *  containing the following properties:
 *   - siteCode: The site code.
 *   - countryCode: The country code.
 *   - currencyCode: The currency code.
 *   - amount: The amount.
 *   - transactionReference: The transaction reference.
 *   - bankReference: The bank reference.
 *   - cancelUrl: The cancel URL.
 *   - errorUrl: The error URL.
 *   - successUrl: The success URL.
 *   - notifyUrl: The notify URL.
 *   - isTest: A boolean indicating if it's a test.
 * @return {string} The generated request hash.
 */
function generateRequestHash(ozowData) {
    const {
        siteCode,
        countryCode,
        currencyCode,
        amount,
        transactionReference,
        bankReference,
        cancelUrl,
        errorUrl,
        successUrl,
        notifyUrl,
        isTest
    } = ozowData;

    const inputString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${""}`;

    const calculatedHashResult = generateRequestHashCheck(inputString);

    return calculatedHashResult;
}

function generateRequestHashCheck(inputString) {
    const stringToHash = inputString.toLowerCase();
    return getSha512Hash(stringToHash);
}

function getSha512Hash(stringToHash) {
    const hash = crypto.createHash("sha512");
    hash.update(stringToHash);
    return hash.digest("hex");
}


app.post("/api/checkout", async (req, res) => {
    try {
        const { amount } = req.body; // Destructure
        // amount from req.body

        const ozowData = {
            siteCode: "ATL-ATL-008",
            countryCode: "ZA",
            currencyCode: "ZAR",
            transactionReference: "AtlegileTest123",
            bankReference: "ABC123",
            cancelUrl: "http://mydomain.com/cancel.html",
            amount: amount, // Assign the amount
            errorUrl: "http://mydomain.com/error.html",
            successUrl: "http://mydomain.com/success.html",
            notifyUrl: "http://mydomain.com/notify.html",
            isTest: false,
        };

        const hashCheck = generateRequestHash(ozowData);
        ozowData.hashCheck = hashCheck;
        console.log(" ozowData is ", ozowData);
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
               
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ozowData),
        };

        fetch("https://api.ozow.com/PostPaymentRequest", options)
            .then((response) => response.json())
            .then((ozowData) => {
                console.log(ozowData);
                res.status(200).json({ paymentUrl: ozowData.url }); // Send the
                // paymentUrl back to the client
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error.message });
            });
    } catch (error) {
        console.error("Error during checkout:", error.message);
        res.status(500).json({ error: error.message });
    }
});


exports.app = functions.https.onRequest(app);

