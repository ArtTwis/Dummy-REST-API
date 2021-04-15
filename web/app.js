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

/*
==========================
======= GET Method =======
==========================
*/

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

app.get('/api/resources/todos', (req, res) => {
  let todoCode = req.query.todo;
  let todosList = [];

  if(todoCode){
    (assets.todos).forEach((todo, index) => {
      if(index == todoCode) todosList.push(setTodoContent(todo, index));
    });
  }else{
    (assets.todos).forEach((todo, index) => {
      todosList.push(setTodoContent(todo, index));
    });
  }

  if(todosList.length > 0)
    res.status(200).json({"total_todos": todosList.length, data: todosList});
  else
    res.status(404).json({"total_todos": 0, data: []})
});

app.get('/api/resources/todos/:todo', (req, res) => {
  let todoCode = req.params.todo;
  let todosList = [];

  if(todoCode){
    todoCode = Number(todoCode);
    
    (assets.todos).forEach((todo, index) => {
      if(index == todoCode) todosList.push(setTodoContent(todo, index));
    });

    if(todosList.length > 0)
      res.status(200).json({"total_todos": todosList.length, data: todosList})
    else
      res.status(404).json({"total_todos": 0, data: []})
  }else{
    res.status(404).json({"total_todos": 0, data: []})
  }
});

app.get('/api/resources/comments', (req, res) => {
  let commentCode = req.query.comment;
  let Comments = [];

  if(commentCode){
    (assets.comments).forEach((comment, index) => {
      if(index == commentCode) Comments.push(setCommentsContent(comment, index));
    });
  }else{
    (assets.comments).forEach((comment, index) => {
      Comments.push(setCommentsContent(comment, index));
    });
  }

  if(Comments.length > 0)
    res.status(200).json({"total_comments": Comments.length, data: Comments});
  else
    res.status(404).json({"total_comments": 0, data: []})
});

app.get('/api/resources/comments/:comment', (req, res) => {
  let commentCode = req.params.comment;
  let Comments = [];

  if(commentCode){
    commentCode = Number(commentCode);

    (assets.comments).forEach((comment, index) => {
      if(index == commentCode) Comments.push(setCommentsContent(comment, index));
    });

    if(Comments.length > 0)
      res.status(200).json({"total_comments": Comments.length, data: Comments})
    else
      res.status(404).json({"total_comments": 0, data: []})
  }else{
    res.status(404).json({"total_comments": 0, data: []})
  }
});

app.get('/api/resources/posts', (req, res) => {
  let postCode = req.query.post;
  let Posts = [];

  if(postCode){
    (assets.posts).forEach((post, index) => {
      if(index == postCode) Posts.push(setPostsContent(post, index));
    });
  }else{
    (assets.posts).forEach((post, index) => {
      Posts.push(setPostsContent(post, index));
    });
  }

  if(Posts.length > 0)
    res.status(200).json({"total_posts": Posts.length, data: Posts})
  else
    res.status(404).json({"total_posts": 0, data: []})
});

app.get('/api/resources/posts/:post', (req, res) => {
  let postCode = req.params.post;
  let Posts = [];

  if(postCode){
    postCode = Number(postCode);

    (assets.posts).forEach((post, index) => {
      if(index == postCode) Posts.push(setPostsContent(post, index));
    });

    if(Posts.length > 0)
      res.status(200).json({"total_posts": Posts.length, data: Posts})
    else
      res.status(404).json({"total_posts": 0, data: []})
  }else{
    res.status(404).json({"total_posts": 0, data: []})
  }
  
});

/*
==========================
======= POST Method =======
==========================
*/

app.post('/api/resources/create/user', (req, res) => {
  let code = req.body;
  let date = new Date();
  let today = new Date();
  let str = today.toGMTString();

  return res.status(201).json({
    ...code,
    "status": "success",
    "message": "User created successfully",
    "createdAt": str
  })
});

app.post('/api/resources/register/user', (req, res) => {
  let code = req.body;

  let date = new Date();
  let today = new Date();
  let str = today.toGMTString();

  let id = Math.floor(Math.random() * 99);
  let tokenId = Math.floor(Math.random() * 9999) + "REST" + Math.floor(Math.random() * 9999) + "API";

  if(code.password){
    return res.status(201).json({
      "id": id,
      "tokenId": tokenId,
      "status": "success",
      "message": "User register successfully",
      "registerAt": str
    })
  }else{
    return res.status(404).json({
      "status": "failure",
      "message": "Missing password"
    })
  }
});

app.post('/api/resources/login/user', (req, res) => {
  let code = req.body;

  let date = new Date();
  let today = new Date();
  let str = today.toGMTString();

  let id = Math.floor(Math.random() * 99);
  let tokenId = Math.floor(Math.random() * 9999) + "REST" + Math.floor(Math.random() * 9999) + "API";

  if(code.password){
    return res.status(201).json({
      "id": id,
      "tokenId": tokenId,
      "status": "success",
      "message": "User login successfully",
      "loginAt": str
    })
  }else{
    return res.status(404).json({
      "status": "failure",
      "message": "Missing password"
    })
  }
});

app.post('/api/resources/create/todo', (req, res) => {
  let code = req.body;
  let date = new Date();
  let today = new Date();
  let str = today.toGMTString();

  return res.status(201).json({
    ...code,
    "status": "success",
    "message": "Todo created successfully",
    "createdAt": str
  })
});

/*
==========================
======= Functions ========
==========================
*/

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