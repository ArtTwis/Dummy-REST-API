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

app.get('/api/resources', (req, res) => {
  res.status(200).json({data: assets.resources});
});

app.get('/api/resources/users', (req, res) => {
  let Users = [];
  (assets.users).forEach((user, index) => {
    Users.push(setUserContent(user, index));
  });
  res.status(200).json({"total_users": Users.length, data: Users})
});

app.get('/api/resources/todos', (req, res) => {
  let todosList = [];
  (assets.todos).forEach((todo, index) => {
    todosList.push(setTodoContent(todo, index));
  });
  res.status(200).json({"total_todos": todosList.length, data: todosList})
});

app.get('/api/resources/comments', (req, res) => {
  let Comments = [];
  (assets.comments).forEach((comment, index) => {
    Comments.push(setCommentsContent(comment, index));
  });
  res.status(200).json({"total_comments": Comments.length, data: Comments})
});

app.get('/api/resources/posts', (req, res) => {
  let Posts = [];
  (assets.posts).forEach((post, index) => {
    Posts.push(setPostsContent(post, index));
  });
  res.status(200).json({"total_posts": Posts.length, data: Posts})
});

app.get('/api/resources/products', (req, res) => {
  let Products = [];
  (assets.products).forEach((product, index) => {
    Products.push(setProductsContent(product, index));
  });
  res.status(200).json({"total_products": Products.length, data: Products})
});

function setUserContent(user, index){
  let mailingServices = ["gmail", "yahoo", "outlook", "hotmail", "onetesthub"];
  let cities = ["Sangaria", "Hanumangarh", "Bathinda", "Delhi", "Kolkata", "Bangalore", "Chennai", "Mysore", "Dharamshala", "Shimla", "Jaipur", "Jodhpur", "Kashmir", "Jammu", "Ladakh", "Leh", "Manali"];

  let fullname = ((user.name).replace(' ', '.')).toLowerCase();

  let temp = {};
  temp["mobile"] = "+91-" + "94144" + Math.floor(Math.random() * 99) + "XXX";
  temp["age"] = Math.floor(Math.random() * 99);
  temp["city"] = cities[Math.floor(Math.random() * cities.length)];
  temp["email"] = fullname + "@" + mailingServices[Math.floor(Math.random() * mailingServices.length)] + ".com";
  return {"id": index + 1, "name": user.name, "sex": user.sex, ...temp, "avatar": user.avatar};
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