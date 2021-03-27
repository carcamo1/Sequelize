import express from 'express';
import db from './database/initializeDB.js';
import apiRoutes from './routes/apiRoutes.js';

const source = express();

const PORT = process.env.PORT || 3000;
const folder = 'public';

source.use(express.urlencoded({ extended: true }));
source.use(express.json());
source.use(express.static(folder));

source.use('/api', apiRoutes); 

async function bootServer() {
  try {
    const mysql = await db.sequelizeDB;
    await mysql.sync();
    source.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();