# Date: 27 / 10 / 2021

## Refactoring Our Routes

so basically reorganize some of our route to make the code a lot better. so right now we have all the route in the same place, our route's http method and the url are the same place together with the rote handler which is this callback function.
<br>
see all (http method, route, callback function) all are the same place

```js
//responding to url parameters
app.get("/api/v1/tours/:id", (req, res) => {
  // console.log(req.params); // {id: "5"}

  // convert id string to number just multiply
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fall",
      message: "wrong id 404 page",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});
```

**And we have these routes and route handlers kind all over the place in the same file**
_but it's kind of difficult to see what route we actually have in our code._
<br>
so what we can do go ahead and basically export all of these handler functions into their own function.
<br>

### separate the callback function

we can separate the callback function, and then define in our route.

```js
// define all of the callback function
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
};

// define the function in our route
// all routes
app.get("/api/v1/tours", getAllTours);
```

we can separate the all route using the trick

```js
// all routes
app.get("/api/v1/tours", getAllTours);
//responding to url parameters
app.get("/api/v1/tours/:id", getTour);
// let's create a post request
// remember in post request we send data to client to server.
app.post("/api/v1/tours", createTour);
// patch request for update data
app.patch("/api/v1/tours/:id", updateTour);
// handling delete request
app.delete("/api/v1/tours/:id", deleteTour);
```

- but here we have one problem, if we want to change the route the we need to change the all route, and that not good, keep try that write DRY code (Don't Repeat Yourself).

<br>

so we can use the **app.route()** and define all http method is one line or one route

```js
// using the app.route() method and define the all route at once
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
```

using this refactoring routes trick our code is lot structure and not meshes.

- recap
  first we separate our callback-function.and then we specify in our route.
  <br>
  second we use same (one) route to all http method like (get, patch, delete), using app.route() method.
  <br>
  that we can change the one route and implement to others.

# date: 28 / 10 / 2021

## Middleware and the request-response cycle

when we hit any express app then we are create a request-response cycle and send the request data object to response.

### What is Middleware?

it's called middleware because it's a function that is executed between, so in the middle of the receiving the request and sending the response.

**and actually, we can say that in express,everything is a middleware even our route definitions.**

some example of middleware is _express.json()_ which is also called body-parser,

the possibilities are really endless with middleware.

## creating our own middleware

example of middleware

```js
app.use(express.json());
```

so yes we use **app.use()** for middleware.
<br>
like for get request we use app.get() so in use to middleware we use app.use()

```js
// creating our own middleware function
app.use((req, res, next) => {
  console.log("Hello from middleware function");
  next();
});
```

so in middleware we define 3 parameter(arguments) (req, res, next) next for if this is not then move on.

- next argument alway be in third position.
  - never forget to call the next function in all of your middleware.

**and if we did't call the next function here well then the request/response cycle would really be stuck at this point. we wouldn't be able to move on and we would never ever send back a response to the client.**

## Using 3rd-party Middleware

lets now use a 3rd-party middleware from npm called **Morgan** in order to make our development life a bit easier.

```js
npm i morgan
```

first of require to our main express file

```js
const morgan = require("morgan");
```

### morgan middleware what is used for

morgan middleware is just let you know which type of request you get it should be **get** or **post** what the route and how much time to load the route and that kind of thing

```js
app.use(morgan("dev"));
// GET /api/v1/tours 304 4.693 ms - -
```