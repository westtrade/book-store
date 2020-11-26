import AuthorResolver from './resolvers/AuthorResolver';
import BookResolver from './resolvers/BookResolver';
import { Container } from 'typedi';
import { BuildSchemaOptions } from 'type-graphql';

export const schemaSettings: BuildSchemaOptions = {
	resolvers: [AuthorResolver, BookResolver],
	container: Container,
};
