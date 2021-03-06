# Date : 6 / 11 / 2021

# Connecting Our Database with the express app

## disclaimer

ALL THE WORK IS ON FINAL PROJECT FILE.

<br>

first go to your cluster and click the connect button,

- CLICK connect to your application

copy the connection string.
<br>

and add to your config file

```env
DATABASE_PASSWORD=YOURPASSWORD
DATABASE=YOUR_CONNECTION_STRING
```

once you set your connection string in your env file then you need to set your password to your connection string, you can replace the password later.
<br>

**change the database name myfirstdata base to your database name**

```bash
@cluster0.7wtc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
# change the myFirstDatabase to your database
# like this
@cluster0.7wtc8.mongodb.net/shop?retryWrites=true&w=majority
```

## install mongoose

```bash
npm i mongoose
```

then require the mongoose

```js
// server.js

const mongoose = require("mongoose");
```

### connect the data base to our app using mongoose

we can use mongoose.connect() to connect our data base to our express app

```js
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    // console.log(con.connection);
    console.log("DB CONNECTION SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });
```

**so here we replace the password string which live in our connection string to our password variable.**
and then set it to a variable called **DB**
<br>

and then use the **mongoose.connect** and use the DB variable, then mongoose.connect send promise so we can handle with .then and .catch

## What is Mongoose?

- Mongoose is and object data modeling library for mongoDB and Node.js , a higher level of abstraction;
  <br>

so it like a relationship between node and express, so Express is a layer of abstraction over regular Node, while Mongoose is a layer of abstraction over the regular MongoDB Drive.

- **Mongoose schema**: where we model our data, bu describing the structure of the data, default values and validation;
- **Mongoose model**: a wrapper for the schema, providing an interface to teh database for CRUD operations

### Create a Schema and model in mongoose

- first we need to create a Schema based on what we want
- then we need to create a model based on the schema, first we type the model name and then the schema ("Tour", tourSchema);

```js
// mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
// mongoose model
const Tour = mongoose.model("Tour", tourSchema);
```

### test the schema and model

```js
// testing the schema and model
const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});
// give promise so we use .then but in future we async/await
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Create documents using mongoose

best way to create documents using mongoose

```js
// controllers/toursControllers.js
exports.createTour = async (req, res) => {
  // create tour using mongoose model
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
```

## Reading documents using mongoose

using the .find() method

```js
exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
};
```

```js
try {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
} catch (error) {
  console.log(error);
}
```

## Update using mongoose

```js
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.prams.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: {
        error,
      },
    });
    console.log(error);
  }
};
```

## delete using mongoose

```js
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
    });
  }
};
```
