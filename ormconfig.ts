import { eServerMode, NODE_ENV } from './src/server/config';

const developmentDatabaseConfig = {
	type: 'sqlite',
	database: './database/dev.database.sqlite',
	logging: true,
	synchronize: true,
};

const productionDatabaseConfig = {
	type: 'postgres',
	host: '10.5.0.3',
	username: 'postgres',
	password: 'password',
	database: 'production-database',
	logging: false,
	synchronize: false,
};

const testingDatabaseConfig = {
	type: 'sqlite',
	database: './database/test.database.sqlite',
	logging: false,
	synchronize: true,
	dropSchema: true,
};

export default {
	...(NODE_ENV == eServerMode.Development
		? developmentDatabaseConfig
		: NODE_ENV === eServerMode.Test
		? testingDatabaseConfig
		: productionDatabaseConfig),

	entities: ['src/server/entity/**/*.ts'],
	migrations: ['src/server/migration/**/*.ts'],
	subscribers: ['src/server/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/server/entity',
		migrationsDir: 'src/server/migration',
		subscribersDir: 'src/server/subscriber',
	},
};
