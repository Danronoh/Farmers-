const express = require("express");
const app = express();
//const path = require("path");
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const config = require("./config/key");

 //const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
 mongoose.connect(uri, { useNewUrlParser: true,useCreateIndex:true });
 const connection= mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
})
   //.then(() => console.log("DB connected"))
   //.catch(err => console.error(err));

//const mongoose = require("mongoose");
//const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
 // .then(() => console.log('MongoDB Connected...'))
 // .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
//if (process.env.NODE_ENV === "production") {

  // Set static folder
 // app.use(express.static("client/build"));

  // index.html for all page routes
  //app.get("*", (req, res) => {
 //   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
 // });
//}
//const app = express();
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});