import { PostStatus } from "@prisma/client";
import * as TypeGraphQL from "type-graphql";
import { ObjectType } from "type-graphql";
import { User } from "./user.model";

@TypeGraphQL.ObjectType("Post", {
    isAbstract: false
})
export class Post {
    @TypeGraphQL.Field(_type => Number, {
        nullable: false
    })
    id!: number;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    title!: string;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    content!: string;

    @TypeGraphQL.Field(_type => User, {
        nullable: true
    })
    author?: User;

    @TypeGraphQL.Field(_type => Number, {
        nullable: false
    })
    authorId!: number;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    status!: PostStatus;

    @TypeGraphQL.Field(_type => Date, {
        nullable: false
    })
    createdAt!: Date;

    @TypeGraphQL.Field(_type => Date, {
        nullable: false
    })
    updatedAt!: Date;

    @TypeGraphQL.Field(_type => Number, {
        nullable: true
    })
    count?: number;

}

@ObjectType()
export class GroupByPost {
    @TypeGraphQL.Field(_type => Number, {
        nullable: true
    })
    count?: number;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    status!: PostStatus;
}
