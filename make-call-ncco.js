require('dotenv').config();

const fs = require('fs');
const path = require('path');


const TO_NUMBER = process.env.TO_NUMBER
const VONAGE_NUMBER = process.env.VONAGE_NUMBER

const VONAGE_API_KEY = process.env.VONAGE_API_KEY
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID

const { Vonage } = require('@vonage/server-sdk')
const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')



const privateKeyPath = path.resolve(__dirname, 'private.key');
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');


const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET,
    applicationId: VONAGE_APPLICATION_ID,
    privateKey: privateKey,
})


async function makeCall() {
    const builder = new NCCOBuilder();
    builder.addAction(new Talk('This is a text to speech call from Vonage'));
    const resp = await vonage.voice.createOutboundCall(
        new OutboundCallWithNCCO(
            builder.build(),
            { type: 'phone', number: TO_NUMBER },
            { type: 'phone', number: VONAGE_NUMBER }
        )
    );

    console.log(resp);
}
makeCall();