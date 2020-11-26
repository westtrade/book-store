import {
	Mutation,
	Query,
	Resolver,
	Arg,
	FieldResolver,
	Root,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import Book from '../entity/Book';
import Author from '../entity/Author';
import { BookInput } from '../inputTypes';

@Resolver((of) => Book)
export default class BookResolver {
	@InjectRepository(Book)
	private readonly bookRepository: Repository<Book>;

	@InjectRepository(Author)
	private readonly authorRepository: Repository<Author>;

	@Query(() => [Book])
	async books() {
		const books = await this.bookRepository.createQueryBuilder().getMany();

		const authors = await this.authorRepository
			.createQueryBuilder()
			.whereInIds(books.filter(({ authorId }) => authorId))
			.groupBy('authorId')
			.getMany();

		const authorsBook = authors.reduce<Record<string, Author>>(
			(result, author) => {
				result[author.authorId.toString()] = author;
				return result;
			},
			{}
		);

		books.map((book) => {
			book.author = authorsBook[book.authorId];
			return book;
		});

		return books;
	}

	@Mutation(() => Book)
	async createBook(@Arg('book') bookInput: BookInput) {
		const author = await this.authorRepository.findOne(bookInput.authorId);
		if (!author) {
			throw new Error('author.not_found');
		}

		const book = this.bookRepository.create({
			...bookInput,
			// author,
			authorId: author.authorId,
		});

		await this.bookRepository.save(book);

		return book;
	}

	@FieldResolver(() => Author)
	async author(@Root() book: Book) {
		if (book.author) {
			return book;
		}

		const author = await this.authorRepository.findOne(book.authorId);
		if (!author) {
			throw new Error('author.not_found');
		}

		return author;
	}
}
