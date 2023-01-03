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

@InputType()
export class PostFilterFieldsDTO {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    content?: string;

    @Field(() => Number, { nullable: true })
    author?: number;

    @Field(() => String, { nullable: true })
    status?: PostStatus;

}
@InputType()
export class FilterGroupByPostDTO {
    @Field(() => String, { nullable: true })
    field?: string;

}