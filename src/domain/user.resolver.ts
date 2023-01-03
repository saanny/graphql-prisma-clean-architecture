import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "./user.entitiy";
import { UserFiltersDTO } from "../dto/filters.dto";
import { UserService } from "../services/user.service";


@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }
    @Query(() => [User])
    async getAllUsers(@Arg("filters") filters: UserFiltersDTO): Promise<Array<any>> {
        return this.userService.getAll(filters);
    }

    @Mutation(() => User!)
    async createUser(@Arg("input") input: CreateUserDTO): Promise<User> {
        return this.userService.save(input);
    }
}