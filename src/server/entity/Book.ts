import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	RelationId,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Author from './Author';

@Entity()
@ObjectType()
export default class Book {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	bookId: number;

	@Field(() => String)
	@Column()
	name: string;

	@Field(() => Number)
	@Column({
		default: 0,
	})
	pageCount: number;

	@Field(() => Author)
	@ManyToOne(() => Author, (author) => author.authorId)
	@JoinColumn({
		name: 'authorId',
	})
	author: Author;

	@Field(() => String)
	@Column()
	authorId: number;
}
