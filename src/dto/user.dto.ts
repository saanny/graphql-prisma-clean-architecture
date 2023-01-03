import { Field, InputType } from "type-graphql";
import { UserRole } from "../domain/enums/UserEnums";

@InputType()
export class CreateUserDTO {
    @Field(() => String!)
    email!: string;

    @Field(() => String!)
    name!: string;

    @Field(() => UserRole!)
    role!: UserRole;

}