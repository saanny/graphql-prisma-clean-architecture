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
        nullable: true
    })
    content?: string | null;

    @TypeGraphQL.Field(_type => Number, {
        nullable: true
    })
    author?: number | null;

    // @TypeGraphQL.Field(_type => PostStatusForEntity, {
    //     nullable: false
    // })
    // status!: PostStatusForEntity;

    @TypeGraphQL.Field(_type => Date, {
        nullable: true
    })
    createdAt?: Date;

    @TypeGraphQL.Field(_type => Date, {
        nullable: true
    })
    updatedAt?: Date;
}
