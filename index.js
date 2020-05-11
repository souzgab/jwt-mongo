const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://admin:admin@flipper-x8viq.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'CHAT'
    });

app.use(express.json());
app.use(cors(), routes)
app.listen(3000, () => { console.log(`Server is running..`) })