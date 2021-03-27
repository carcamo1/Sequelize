import express from 'express';
import db from './database/initializeDB.js';
import apiRoutes from './routes/apiRoutes.js';

const app = open();

const PORT = process.env.PORT || 3000;
const folder = 'public';

app.use(open.urlencoded({ extended: true }));
app.use(open.json());
app.use(open.static(folder));

app.use('/api', apiRoutes); 

async function bootServer() {
  try {
    const mysql = await db.sequelizeDB;
    await mysql.sync();
    app.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();