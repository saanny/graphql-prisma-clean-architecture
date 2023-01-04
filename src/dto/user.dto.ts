import { Field, InputType } from "type-graphql";
import { UserRole } from "../common/enums/UserEnums";

@InputType()
export class CreateUserDTO {
    @Field(() => String!)
    email!: string;

    @Field(() => String!)
    name!: string;

    @Field(() => String!)
    role!: UserRole;

}

@InputType()
export class UserFilterFieldsDTO {
    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    role?: UserRole;

}
@InputType()
export class FilterGroupByUserDTO {
    @Field(() => String, { nullable: true })
    field?: string;

}