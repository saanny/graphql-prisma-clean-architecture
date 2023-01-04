import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "./user.model";
import { UserFiltersDTO } from "../dto/filters.dto";
import { UserRepository } from "../repository/user.repository";
import { Service } from "typedi";
@Service()
@Resolver()
export class UserResolver {

    public constructor(private readonly _userRepository: UserRepository) { }

    @Query(() => [User])
    async getAllUsers(@Arg("filters") filters: UserFiltersDTO): Promise<Array<User>> {

        return this._userRepository.getAll(filters);
    }

    @Mutation(() => User!)
    async createUser(@Arg("input") input: CreateUserDTO): Promise<User> {

        return this._userRepository.save(input);
    }
}