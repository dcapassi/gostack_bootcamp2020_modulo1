// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = { name: "Diego Capassi", email: "diego.capassi.moreira@gmail.com"}

const express = require("express");
const server = express();

//localhost:3010/route/1
server.get("/route/:id", (req, res) => {
  const nome = req.query.nome;
  const id = req.params.id;
  return res.json({ message: `Hello ${nome} id=${id}` });
});

server.listen(3010);
