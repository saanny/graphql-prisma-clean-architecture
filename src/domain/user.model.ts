import { UserRole } from "../common/enums/UserEnums";
import * as TypeGraphQL from "type-graphql";
import { Post } from "./post.model";

@TypeGraphQL.ObjectType("User", {
    isAbstract: true
})
export class User {
    @TypeGraphQL.Field(_type => Number, {
        nullable: false
    })
    id!: number;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    email!: string;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    name!: string;

    @TypeGraphQL.Field(_type => String, {
        nullable: false
    })
    role!: UserRole;
    @TypeGraphQL.Field(_type => [Post], {
        nullable: true
    })
    posts?: [Post];
}