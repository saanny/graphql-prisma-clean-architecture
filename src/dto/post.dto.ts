import { Field, InputType } from "type-graphql";
// import { PostStatusForEntity } from "../domain/enums/StatusEnum";


@InputType()
export class CreatePostDTO {
    @Field(() => String!)
    title!: string;

    @Field(() => String!)
    content!: string;

    @Field(() => Number!)
    author!: number;

    // @Field(() => PostStatusForEntity!)
    // status!: PostStatusForEntity;

    // @Field(() => Date!)
    // createdAt?: Date;

    // @Field(() => Date!)
    // updatedAt?: Date;
}