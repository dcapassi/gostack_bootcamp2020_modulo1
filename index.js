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

//localhost:3010/users/1
server.get("/user/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ user: users[id] });
});

server.get("/user/", (req, res) => {
  return res.json(users);
});

server.post("/user/", (req, res) => {
  const { user } = req.body;
  if (users.indexOf(user) == -1) {
    users.push(user);
  }
  return res.json(user);
});

server.put("/user/:id", (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  const indexOfUser = users.indexOf(user);

  if (indexOfUser == -1) {
    users[id] = user;
  }

  return res.json(user);
});

server.delete("/user/", (req, res) => {
  const { user } = req.body;
  const indexOfUser = users.indexOf(user);

  if (indexOfUser != -1) {
    users.splice(indexOfUser, 1);
  }
  return res.json(user);
});

server.listen(3010);
