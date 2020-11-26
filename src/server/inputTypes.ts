import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthorInput {
	@Field(() => String)
	name: string;
}

@InputType()
export class BookInput {
	@Field(() => String)
	name: string;

	@Field(() => Number)
	pageCount: number;

	@Field(() => String)
	authorId: string;
}
