const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to database!');
}).catch(e => {
    console.log('Connection failed!');
    console.error(e);
});

module.exports = db ;