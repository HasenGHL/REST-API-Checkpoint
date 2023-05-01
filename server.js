const express = require('express');
const app = express();
const port = 4000;
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
      // Start server
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


  app.use(express.json());

  // GET route to return all users
app.get('/users', (req, res) => {
    res.json(User);
  });
  
  // POST route to add a new user to the database
  app.post('/users', (req, res) => {
    const newUser = req.body;
    User.push(newUser);
    res.status(201).json(newUser);
  });
  
  // PUT route to edit a user by ID
  app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = User.findIndex(user => user.id === id);
    if (index !== -1) {
      User[index] = { ...User[index], ...updatedUser };
      res.json(User[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
  
  // DELETE route to remove a user by ID
  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = User.findIndex(user => user.id === id);
    if (index !== -1) {
        User.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
  
  