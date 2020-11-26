import * as config from './config';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import { useContainer } from 'typeorm';
import { Container } from 'typedi';

import { createConnection } from 'typeorm';
import { schemaSettings } from './schemaSettings';
import { buildSchema } from 'type-graphql';

useContainer(Container);

async function main() {
	await createConnection();

	const schema = await buildSchema(schemaSettings);
	const server = new ApolloServer({ schema });

	server.listen(config.HTTP_PORT).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
}

main().catch((error) => console.log(error));
