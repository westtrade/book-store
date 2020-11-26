import { Mutation, Resolver, Arg } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import Author from '../entity/Author';
import { AuthorInput } from '../inputTypes';

@Resolver()
export default class AuthorResolver {
	@InjectRepository(Author)
	private readonly authorRepository: Repository<Author>;

	@Mutation(() => Author)
	async createAuthor(@Arg('author') authorInput: AuthorInput) {
		const author = await this.authorRepository.create({
			...authorInput,
		});

		await this.authorRepository.save(author);

		return author;
	}
}
