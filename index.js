// Query Params = ?teste=1
// Route Params = /users/1 ex:   const { name } = req.query;
// Request Body = { name: "Diego Capassi", email: "diego.capassi.moreira@gmail.com"}

const express = require("express");
const server = express();
server.use(express.json());

let users = [];

//CRUD
/*
Create
Read
Updated
Delete
*/

//Middleware to log HTTP Requests and execution time
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method} URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

//Middleware to check if the body format is valid
function checkBodyFormat(req, res, next) {
  if (!req.body.user) {
    return res.status(400).json({ error: "name field is required" });
  }
  next();
}

//Middleware to check if the user id params exists
function checkIndexFormat(req, res, next) {
  if (!users[req.params.id]) {
    return res.status(400).json({ error: "User does not exist" });
  }
  next();
}

server.get("/user/:id", checkIndexFormat, (req, res) => {
  const { id } = req.params;
  return res.json({ user: users[id] });
});

server.get("/user/", (req, res) => {
  return res.json(users);
});

server.post("/user/", checkBodyFormat, (req, res) => {
  const { user } = req.body;
  if (users.indexOf(user) == -1) {
    users.push(user);
  }
  return res.json(user);
});

server.put("/user/:id", checkIndexFormat, checkBodyFormat, (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  const indexOfUser = users.indexOf(user);

  if (indexOfUser == -1) {
    users[id] = user;
  }

  return res.json(user);
});

server.delete("/user/:id", checkIndexFormat, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  return res.send();
});

server.listen(3010);
