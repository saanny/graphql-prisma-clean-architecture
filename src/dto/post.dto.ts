import { PostStatus } from "@prisma/client";
import { Field, InputType } from "type-graphql";


@InputType()
export class CreatePostDTO {
    @Field(() => String!)
    title!: string;

    @Field(() => String!)
    content!: string;

    @Field(() => Number!)
    author!: number;

    @Field(() => String!)
    status!: PostStatus;

}