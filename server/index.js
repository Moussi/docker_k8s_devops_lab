const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const FakeDb = require('./models/fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
mongoose.promise = global.promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const uri = config.DB_URI;
mongoose.connect(uri)
.then(()=> {
    const fakeDb = new FakeDb();
    fakeDb.saveDb();
})
.catch(e => console.log("DB error", e));

const app= express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json())

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, function(){
    console.log('I am running');
});