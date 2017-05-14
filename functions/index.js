"use strict";
const functions = require('firebase-functions');
//key: DzbmKF2lYOg35Jf2rwsU
//token: 8a42f1af8a42f1af8a969e64cf8a19fcba88a428a42f1afd2a63127a57dde9a713503cd
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://partymaker-8826f.firebaseio.com"
});

process.on('uncaughtException', err => console.error('uncaughtException', err));

const listener = event => {
  const ref = event.data.ref;
  const val = event.data.val();
  if (val && !val.processed) {
    const fieldToGenerateTokenWith = val['user_id'];
    return admin.auth()
      .createCustomToken(fieldToGenerateTokenWith)
      .then(token => {
        const data = Object.assign(val, {
          access_token: token,
          expires_in: null,
          processed: true
        });
        ref.set(data);
        return data;
      })
      .then(data => console.log(`custom token generated = ${JSON.stringify(data)}`))
  } else {
    return Promise.resolve();
  }
};

exports.vkAuth = functions.database.ref('auth/vk/{pushId}').onWrite(listener);