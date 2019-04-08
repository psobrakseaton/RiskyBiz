const MongoClient = require('mongodb').MongoClient;

// mongodb url is set using a Now secret, to avoid exposing the password
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

// connecting is a Promise. A Promise represents a value that
// we do not have yet, but is eventually expected to exist.
// Eventually, our client will connect and this promise will be resolved.
const connecting = client.connect();

// db is an async function that eventually returns a db instance
const db = async () => {
  // connecting is a Promise, which represents a value that
  // we do not have yet. It will arrive asynchronously,
  // and the result will be assigned to our client value.
  const client = await connecting
  return client.db('riskybiz')
}

// collection is an async function that eventually returns a collection,
// from which we can read or write data
const collection = async (name) => {
  // first we wait for the db to be available
  const dbase = await db()
  // now that we have the db instance, declare the collection on it
  return dbase.collection(name)
}

// export a set of functions from this module
module.exports = {
  connect: () => connecting,
  db,
  collection,
}

// when mongodb is connected, the function passed to .then() will be called.
// this is the same thing that makes the other async functions work.
connecting.then(() => {
  console.log('connected to mongodb')
})

// if mongodb fails to connect, the catch handler will be called
connecting.catch((err) => {
  console.log('failed to connect to mongodb', err)
})
