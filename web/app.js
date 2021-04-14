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

// let Comments = [];
// (assets.comments).forEach((comment, index) => {
//   Comments.push(setCommentsContent(comment, index));
// });

// let Posts = [];
// (assets.posts).forEach((post, index) => {
//   Posts.push(setPostsContent(post, index));
// });

// let Products = [];
// (assets.products).forEach((product, index) => {
//   Products.push(setProductsContent(product, index));
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

function setCommentsContent(comment, index){
  let mailingServices = ["gmail", "yahoo", "outlook", "hotmail", "onetesthub"];
  let fullname = ((comment.name).replace(' ', '.')).toLowerCase();
  let emailId = fullname + "@" + mailingServices[Math.floor(Math.random() * mailingServices.length)] + ".com";

  return {"postId": "11141XXX786", "id": index + 1, "name": comment.name, "sex": comment.sex, "email": emailId, "body": comment.body};
}

function setPostsContent(post, index){
  return {"userId": "1412XXX786", "id": index + 1, ...post};
}

function setProductsContent(product, index){
  return {"productId": index + 1, ...product};
}