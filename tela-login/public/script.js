document.getElementById("edit-btn").addEventListener("click", function() {
    document.getElementById("user-info").style.display = "none";
    document.getElementById("update-form").style.display = "block";
    
});

const buttonClose = document.querySelector("dialog button")

buttonClose.onclick = function () {
    modal.close()
}

document.getElementById("user-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var newName = document.getElementById("new-name").value;
    var newAge = document.getElementById("new-age").value;
    var newAddress = document.getElementById("new-address").value;
    var newDistrict = document.getElementById("new-district").value;
    var newState = document.getElementById("new-state").value;
    var newBio = document.getElementById("new-bio").value;

    document.getElementById("name").innerText = newName;
    document.getElementById("age").innerText = newAge;
    document.getElementById("address").innerText = newAddress;
    document.getElementById("district").innerText = newDistrict;
    document.getElementById("state").innerText = newState;
    document.getElementById("bio").innerText = newBio;

    document.getElementById("user-info").style.display = "block";
    document.getElementById("update-form").style.display = "none";
});

const button = document.querySelector("button")
const modal = document.querySelector("dialog")

button.onclick = function () {
    modal.showModal()
} 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/userData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));
db.once('open', function() {
  console.log('Conectado ao banco de dados MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  district: String,
  state: String,
  bio: String
});
const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    district: req.body.district,
    state: req.body.state,
    bio: req.body.bio
  });
  await newUser.save();
  res.json({ message: 'Usuário criado com sucesso', user: newUser });
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


fetch('/api/users')
  .then(response => response.json())
  .then(users => {
    console.log(users);
  })
  .catch(error => console.error('Erro ao buscar usuários:', error));

localStorage.setItem('userData', JSON.stringify({
    name: newName,
    age: newAge,
    address: newAddress,
    district: newDistrict,
    state: newState,
    bio: newBio
}));

window.addEventListener('load', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById("name").innerText = userData.name;
        document.getElementById("age").innerText = userData.age;
        document.getElementById("address").innerText = userData.address;
        document.getElementById("district").innerText = userData.district;
        document.getElementById("state").innerText = userData.state;
        document.getElementById("bio").innerText = userData.bio;
    }
});

window.addEventListener('load', function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userData = users[0]; 
            document.getElementById("name").innerText = userData.name;
            document.getElementById("age").innerText = userData.age;
            document.getElementById("address").innerText = userData.address;
            document.getElementById("district").innerText = userData.district;
            document.getElementById("state").innerText = userData.state;
            document.getElementById("bio").innerText = userData.bio;
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
});
