const express = require("express");
const mongoose = require("mongoose");

// Assign environment variables
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
console.log(mongoUri)

/**
 * Setup services
 */

// Initiliase an express server
const app = express();

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true
};

// Function to connect to the database
const conn = () => {
  mongoose.connect(
    mongoUri,
    options
  );
};
// Call it to connect
conn();

// Handle the database connection and retry as needed
const db = mongoose.connection;
db.on("error", err => {
  console.log("There was a problem connecting to mongo: ", err);
  console.log("Trying again");
  setTimeout(() => conn(), 5000);
});
db.once("open", () => console.log("Successfully connected to mongo"));

// Setup routes to respond to client
app.get("/welcome", async (req, res) => {
  console.log("Client request received");
  try {
  const user = await User.find().exec();
  console.log("user=" , user );
  console.log(user[0].name);
  res.send(
    `Hello Client! There is one record in the database for ${user[0].name} `
  );
  } catch (error) {
    res.send("error: " + error.message)
    
  }
});

var users;

app.get("/user", async (req, res) => {
  console.log("inside get user");
 const users = await User.find().exec();
 // users =[{name:'tyui'},{name:'tototyu'},{name:'reaesd'}]
  
  res.send(
    {users}
  );
}) 
  
app.post("/adduser", (req, res) => {
  console.log("inside set user");
  console.log('\x1b[36m%s\x1b[0m', "req="+ req);

  
  const user = new User( { name: "vvvvvvvvvvvv" } );
  user.save()
  .then(item => {
  /* res.send("item saved to database") ; */ 
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });
// Setup a record in the database to retrieve
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("User", userSchema);
/*
const user = new User({ name: "Big Bill Brown" });
user
  .save()
  .then(user => console.log(`${user.name} saved to the database`))
  .catch(err => console.log(err));
*/
app.listen(port, () => console.log(`Listening on port ${port}`));
