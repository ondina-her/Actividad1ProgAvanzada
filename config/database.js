const mongoose = require('mongoose');
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("dataBase Connected");
}).catch((err) => {
    console.log("error connecting to data base",err);
});

module.exports = mongoose;
