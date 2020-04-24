import { createConnection, Connection, Repository } from 'typeorm';

import { User } from '../models/User';

const entities = [
  User,
];

class Database {
  connection: Connection;

  async run(): Promise<void> {
    try {
      this.connection = await createConnection({
        type: 'sqlite',
        database: './database.sqlite',
        entities,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getRepository(type: Function): Repository<typeof type> {
    return this.connection.getRepository(type);
  }
}

export default Database;
