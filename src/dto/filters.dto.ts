import { Field, InputType } from "type-graphql";
import { FilterGroupByPostDTO, PostFilterFieldsDTO } from "./post.dto";
import { FilterGroupByUserDTO, UserFilterFieldsDTO } from "./user.dto";

@InputType()
export class UserFiltersDTO {
    @Field()
    where?: UserFilterFieldsDTO;

    @Field()
    groupBy?: FilterGroupByUserDTO;
}

@InputType()
export class PostFiltersDTO {
    @Field()
    where?: PostFilterFieldsDTO;

    @Field()
    groupBy?: FilterGroupByPostDTO;

}
