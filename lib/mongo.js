const MongoClient = require('mongodb').MongoClient;

// mongodb url is set using a Now secret, to avoid exposing the password
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

const connecting = client.connect();

module.exports.connect = () => connecting

// when mongodb is connected, the function passed to .then() will be called
connecting.then(() => {
  console.log('connected to mongodb')
})

// if mongodb fails to connect, the catch handler function will be called
connecting.catch(err => {
  console.log('failed to connect to mongodb', err)
})
