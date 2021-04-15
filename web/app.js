const express = require('express');
const app = express();
const port = process.env.PORT || 1818;
let bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const assets = require('./assets');
const { users } = require('./assets');

app.listen(port, function() {
  console.log('server listening on port ' + port);
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/resources', (req, res) => {
  res.status(200).json({data: assets.resources});
});

app.get('/api/resources/users', (req, res) => {
  let userCode = req.query.user;
  let Users = [];
  if(userCode){
    userCode = Number(userCode);
    (assets.users).forEach((user, index) => {
      if(index == userCode) Users.push(setUserContent(user, index));
    });
  }else{
    (assets.users).forEach((user, index) => {
      Users.push(setUserContent(user, index));
    });
  }
  if(Users.length > 0)
    res.status(200).json({"total_users": Users.length, data: Users})
  else
    res.status(404).json({"total_users": 0, data: []})
});

app.get('/api/resources/users/:user', (req, res) => {
  let userCode = req.params.user;
  let Users = [];
  if(userCode){
    userCode = Number(userCode);
    (assets.users).forEach((user, index) => {
      if(index == userCode) Users.push(setUserContent(user, index));
    });
    if(Users.length > 0)
      res.status(200).json({"total_users": Users.length, data: Users})
    else
      res.status(404).json({"total_users": 0, data: []})
  }else{
    res.status(404).json({"total_users": 0, data: []})
  }
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
  let productCode = req.query.product;
  let Products = [];

  if(productCode){
    productCode = Number(productCode);
    (assets.products).forEach((product, index) => {
      if(index == productCode) Products.push(setProductsContent(product, index));
    });
  }else{
    (assets.products).forEach((product, index) => {
      Products.push(setProductsContent(product, index));
    });
  }

  if(Products.length > 0)
    res.status(200).json({"total_products": Products.length, data: Products});
  else
    res.status(404).json({"total_products": 0, data: []})
});

app.get('/api/resources/products/:product', (req, res) => {
  let productCode = req.params.product;
  let Products = [];
  if(productCode){
    productCode = Number(productCode);
    
    (assets.products).forEach((product, index) => {
      if(index == productCode) Products.push(setProductsContent(product, index));
    });

    if(Products.length > 0)
      res.status(200).json({"total_products": Products.length, data: Products})
    else
      res.status(404).json({"total_products": 0, data: []})
  }else{
    res.status(404).json({"total_products": 0, data: []})
  }
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
  return {"id": index, "name": user.name, "sex": user.sex, ...temp, "avatar": user.avatar};
}

function setTodoContent(todo, index){
  let boolValues = ["true", "false"];
  todo["isCompleted"] = boolValues[Math.floor(Math.random() * boolValues.length)]
  return {"id": index, ...todo}
}

function setCommentsContent(comment, index){
  let mailingServices = ["gmail", "yahoo", "outlook", "hotmail", "onetesthub"];
  let fullname = ((comment.name).replace(' ', '.')).toLowerCase();
  let emailId = fullname + "@" + mailingServices[Math.floor(Math.random() * mailingServices.length)] + ".com";

  return {"postId": "11141XXX786", "id": index, "name": comment.name, "sex": comment.sex, "email": emailId, "body": comment.body};
}

function setPostsContent(post, index){
  return {"userId": "1412XXX786", "id": index, ...post};
}

function setProductsContent(product, index){
  return {"productId": index, ...product};
}