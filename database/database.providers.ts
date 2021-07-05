import { createConnection } from 'typeorm';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: process.env.SQL_HOST_URL,
      port: 3306,
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      entityPrefix:'tm_',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      //synchronize: true   
     }),
  },
];