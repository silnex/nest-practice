import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.' + process.env.NODE_ENV });
const config = {
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(config, {
      type: 'sqlite',
      database: 'database.sqlite',
    });
    break;
  case 'test':
    Object.assign(config, {
      type: 'sqlite',
      database: 'test.sqlite',
    });
    break;
  case 'production':
    Object.assign(config, {
      type: 'mysql',
      host: `${process.env.DATABASE_HOST}`,
      port: `${process.env.DATABASE_PORT}`,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      autoLoadEntities: true,
    });
    break;
  default:
    throw new Error('Unknown database config error');
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
