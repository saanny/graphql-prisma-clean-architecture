import { PrismaClient } from "@prisma/client";
import { IPostService } from "../domain/IPostService";
import { Post } from "../domain/post.entity";

import { PostFiltersDTO } from "../dto/filters.dto";
import { CreatePostDTO } from "../dto/post.dto";
import { prisma } from "../infrastructure/prisma";

export class PostService implements IPostService {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = prisma;
    }

    async save(post: CreatePostDTO): Promise<Post> {
        return this.prismaClient
            .post.create({
                data: {
                    ...post,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
    }

    async getAll(filters: PostFiltersDTO): Promise<Array<any>> {
        console.log(filters)
        let posts: Array<Post> = [];

        const filtersData: any = {}

        if (filters?.where?.author) {
            filtersData.where = { ...filtersData?.where, author: filters.where?.author }
        }
        if (filters?.where?.content) {
            filtersData.where = { ...filtersData?.where, content: filters?.where?.content }
        }
        if (filters?.where?.status) {
            filtersData.where = { ...filtersData?.where, status: filters?.where?.status }
        }

        if (filters?.groupBy?.field) {
            filtersData.groupBy = {
                by: [filters?.groupBy?.field],
                _count: {
                    role: true,
                },
            }

            posts = await this.prismaClient.post.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }
            });

        } else {
            posts = await this.prismaClient.post.findMany({
                where: { ...filtersData.where }
            });
        }

        return posts;

    }





}