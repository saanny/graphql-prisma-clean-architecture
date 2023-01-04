import { PostStatus } from "@prisma/client";
import * as TypeGraphQL from "type-graphql";

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

    @TypeGraphQL.Field(_type => Number, {
        nullable: false
    })
    author!: number;

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

}
