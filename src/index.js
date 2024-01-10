const express = require('express');
const sequelize = require('./utils/sequelize');
const AuthRoutes = require('./routes/auth')
const ProfilesRoutes = require('./routes/profiles');
const cors = require('cors')


const app = express();
app.use('/photos', express.static('public/photos'));
app.use(express.json());
app.use(cors())
app.use('/user', AuthRoutes)
app.use('', ProfilesRoutes)



// Запуск сервера
const startApp = () => {
  sequelize.sync()
    .then(() => console.log("Connect to MySQL"))
    .catch(err => console.log(err))
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startApp()