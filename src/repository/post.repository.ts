import { Post } from "@prisma/client";
import { Service } from "typedi";
import { PostFiltersDTO } from "../dto/filters.dto";
import { CreatePostDTO } from "../dto/post.dto";
import { Prisma } from "../dataSource/prisma.datasource";


@Service()
export class PostRepository {
    constructor(private dataSource: Prisma) { }

    async save(post: CreatePostDTO): Promise<Post> {

        return this.dataSource.prisma.post.create({
            data: {
                ...post,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    async getAll(filters: PostFiltersDTO): Promise<Array<Post>> {

        let posts: Array<Post> = [];

        const filtersData: any = {}

        if (filters?.where?.authorId) {
            filtersData.where = { ...filtersData?.where, authorId: filters.where?.authorId }
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
                    [filters?.groupBy?.field]: true,
                },
            }

            posts = await this.dataSource.prisma.post.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }

            });

        } else {
            posts = await this.dataSource.prisma.post.findMany({
                where: { ...filtersData.where },
                include: {
                    author: true
                }
            });
        }

        return posts;

    }





}