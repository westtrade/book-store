import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export default class Author {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	authorId: number;

	@Field(() => String)
	@Column()
	name: string;
}
