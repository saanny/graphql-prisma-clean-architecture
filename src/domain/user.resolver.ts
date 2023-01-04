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
import { Service } from "typedi";
@Service()
@Resolver()
export class UserResolver {

    public constructor(private readonly _userService: UserService) { }

    @Query(() => [User])
    async getAllUsers(@Arg("filters") filters: UserFiltersDTO): Promise<Array<User>> {

        return this._userService.getAll(filters);
    }

    @Mutation(() => User!)
    async createUser(@Arg("input") input: CreateUserDTO): Promise<User> {

        return this._userService.save(input);
    }
}