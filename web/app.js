const express = require('express');
const app = express();
const port = process.env.PORT || 1818;
let bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const assets = require('./assets');

app.listen(port, function() {
  console.log('server listening on port ' + port);
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/resources', (req, res) => {
  res.status(200).json({data: assets.resources});
});

// let Users = [];
// (assets.users).forEach((user, index) => {
//   Users.push(setUserContent(user, index));
// });

// let todosList = [];
// (assets.todos).forEach((todo, index) => {
//   todosList.push(setTodoContent(todo, index));
// });

function setUserContent(user, index){
  let mailingServices = ["gmail", "yahoo", "outlook", "hotmail", "onetesthub"];
  let cities = ["Sangaria", "Hanumangarh", "Bathinda", "Delhi", "Kolkata", "Bangalore", "Chennai", "Mysore", "Dharamshala", "Shimla", "Jaipur", "Jodhpur", "Kashmir", "Jammu", "Ladakh", "Leh", "Manali"];

  let fullname = ((user.name).replace(' ', '.')).toLowerCase();
  user["mobile"] = "+91-" + "94144" + Math.floor(Math.random() * 99) + "XXX";
  user["age"] = Math.floor(Math.random() * 99);
  user["city"] = cities[Math.floor(Math.random() * cities.length)];
  user["email"] = fullname + "@" + mailingServices[Math.floor(Math.random() * mailingServices.length)] + ".com";
  return {"id": index + 1, ...user};
}

function setTodoContent(todo, index){
  let boolValues = ["true", "false"];
  todo["isCompleted"] = boolValues[Math.floor(Math.random() * boolValues.length)]
  return {"id": index + 1, ...todo}
}