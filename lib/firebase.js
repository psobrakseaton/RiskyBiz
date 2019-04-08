const admin = require('firebase-admin')

// The firebase admin console provides a json blob full of config data.
// Some of this data is secret and we don't want it checked into our code,
// so we've stored it as an environment variable using Now.
// When our code runs, we can parse the json into a javascript object,
// and use it to initialize the firebase admin SDK.
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG)

// Initialize the firebase admin client using our secret JSON credentials
// (code mostly copied from firebase documentation)
const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://riskybizz.firebaseio.com',
})

module.exports.firebase = firebase
