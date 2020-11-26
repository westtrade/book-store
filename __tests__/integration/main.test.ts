import {
	ApolloServerTestClient,
	createTestClient,
} from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { schemaSettings } from '../../src/server/schemaSettings';
import { useContainer } from 'typeorm';
import { createConnection } from 'typeorm';

let server: ApolloServer;
let client: ApolloServerTestClient;

beforeAll(async () => {
	useContainer(Container);

	await createConnection();

	const schema = await buildSchema(schemaSettings);

	server = new ApolloServer({ schema });
	client = createTestClient(server);
});

test('create author', async () => {
	const { data: { createAuthor } = {}, errors } = await client.mutate({
		mutation: `
            mutation createAuthor($author: AuthorInput!) {
                createAuthor(author:$author) {
                    authorId
                    name
                }
            }

        `,

		variables: {
			author: {
				name: 'Benjamin Batton',
			},
		},
	});

	expect(errors).toBeUndefined();
	expect(createAuthor.name).toBe('Benjamin Batton');
	expect(createAuthor.authorId).toBe('1');
});

test('create book', async () => {
	const { data: { createBook } = {}, errors } = await client.mutate({
		mutation: `
            mutation createBook($book:BookInput!) {
                createBook(book: $book) {
                    bookId
                    name
                    pageCount
                    authorId
                    author {
                        authorId
                        name
                    }
                }
            }
        `,

		variables: {
			book: {
				name: 'Strange history',
				pageCount: 124,
				authorId: '1',
			},
		},
	});

	expect(errors).toBeUndefined();
	expect(createBook.bookId).toBe('1');
	expect(createBook.name).toBe('Strange history');
	expect(createBook.pageCount).toBe(124);
	expect(createBook.authorId).toBe('1');
	expect(createBook.author.authorId).toBe('1');
	expect(createBook.author.name).toBe('Benjamin Batton');
});

test('get books list, without author', async () => {
	const { data: { books } = {}, errors } = await client.query({
		query: `
            query Books {
                books {
                    bookId
                    name
                    pageCount
                    authorId
                }
            }
        `,
	});

	expect(errors).toBeUndefined();
	expect(books.length).toBe(1);
	expect(books[0]).toEqual({
		bookId: '1',
		name: 'Strange history',
		pageCount: 124,
		authorId: '1',
	});
});

test('get books list, with author', async () => {
	const { data: { books } = {}, errors } = await client.query({
		query: `
            query Books {
                books {
                    bookId
                    name
                    pageCount
                    authorId
                    author {
                        authorId
                        name
                    }
                }
            }
        `,
	});

	expect(errors).toBeUndefined();
	expect(books.length).toBe(1);
	expect(books[0]).toEqual({
		bookId: '1',
		name: 'Strange history',
		pageCount: 124,
		authorId: '1',
		author: {
			authorId: '1',
			name: 'Strange history',
		},
	});
});
