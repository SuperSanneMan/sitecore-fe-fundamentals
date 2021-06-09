require('dotenv').config();
const express = require("express");
const cors = require("cors");
const services = require("../services/getService");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/items', (req, res) => services.setItem(req.body).then(result => res.send(`${JSON.stringify(result)}`)));

app.get('/items/:sprintId', (req, res) => {
  const sprintId = req.params.sprintId;
  services.getItemsBySprintId(sprintId).then(result => res.send(`${JSON.stringify(result)}`));
})

app.put('/item/:id', (req, res) => {
  const id = req.params.id;
  services.changeItem(id, req.body).then(result => res.send(`${JSON.stringify(result)}`))
});

app.delete('/item/:id', (req, res) => {
  const id = req.params.id;
  services.deleteItem(id).then(result => res.send(`${JSON.stringify(result)}`))
});

app.get('/item/:id', (req, res) => {
  const id = req.params.id;
  services.getItemById(id).then(result => res.send(`${JSON.stringify(result)}`));
})

app.get('/sprints', (req, res) => services.getAll().then(result => res.send(`${JSON.stringify(result)}`)))

app.get('/sprints/:id', (req, res) => {
  const id = req.params.id;
  services.getById(id).then(result => res.send(`${JSON.stringify(result)}`));
})

app.get('/categories', (req, res) => services.getCategories().then(result => res.send(`${JSON.stringify(result)}`)))
app.get('/sprints/category/:id', (req, res) => {
  const id = req.params.id;
  services.getByCategory(id).then(result => res.send(`${JSON.stringify(result)}`));
})

app.get('/comments/:sprintId', (req, res) => {
  const sprintId = req.params.sprintId;
  services.getCommentsBySprintId(sprintId).then(result => res.send(`${JSON.stringify(result)}`));
})

app.listen(PORT, () => console.log("Server is running on port " + PORT));