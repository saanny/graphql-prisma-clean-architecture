import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { prisma } from '../infrastructure/prisma'
import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "./user.entitiy";


@Resolver()
export class UserResolver {
    constructor(private prismaClient: PrismaClient) {
        this.prismaClient = prisma;
    }
    @Query(() => [User])
    getAll(): Promise<User[]> {
        return this.prismaClient.user.findMany();
    }

    @Mutation(() => User!)
    async createUser(@Arg("input") input: CreateUserDTO): Promise<User> {
        return this.prismaClient
            .user.create({
                data: {
                    ...input
                }
            })
    }
}