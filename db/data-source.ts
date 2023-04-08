import { DataSource, DataSourceOptions } from 'typeorm';
import * as config from "config";

const mysqlConfig = config.get("mysqlConfig");

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: mysqlConfig.localhost,
  port: mysqlConfig.port,
  username:mysqlConfig.username, 
  password:mysqlConfig.password,
  database: mysqlConfig.database,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/db/migrations/*.js'],
  name: 'mysql',
  synchronize: mysqlConfig.synchronize,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
