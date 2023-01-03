import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { Post } from "./post.entity";
import { prisma } from '../infrastructure/prisma'
import { PrismaClient } from "@prisma/client";
import { CreatePostDTO } from "../dto/post.dto";

@Resolver()
export class PostResolver {
    constructor(private prismaClient: PrismaClient) {
        this.prismaClient = prisma;
    }
    @Query(() => [Post])
    async getAll(): Promise<Post[]> {
        const posts = await this.prismaClient.post.findMany();
        return posts;
    }

    @Mutation(() => Post!)
    async createPost(@Arg("input") input: CreatePostDTO): Promise<Post> {
        return this.prismaClient
            .post.create({
                data: {
                    ...input,
                    status: "Archived",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
    }
}