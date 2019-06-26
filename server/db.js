const mongo = require('mongoose');

function startDb() {
  console.log(process.env.MONGO_ATLAS_URL)
  mongo.connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log('Mongodb successfully connected'));

  return mongo.connection
    .on('error', console.error)
    .on('disconnected', startDb);
}

module.exports = {
  startDb,
};
