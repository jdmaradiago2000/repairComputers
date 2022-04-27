const express = require('express');

//Routes
const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

//Utils
const { db } = require('./utils/database');

//Init express app
const app = express();

//Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

db.sync() //db.sync({ force: true }) es recomendable solo utiliar en desarrolo, ya que quita todo para montar el modelo actualizado.
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Spin up server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express app runnning on port: ${PORT}`);
});
