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
                ...post
            }
        })
    }

    async getAll(filters: PostFiltersDTO): Promise<Array<any>> {

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

            posts = await this.dataSource.prisma.post.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }
            });

        } else {
            posts = await this.dataSource.prisma.post.findMany({
                where: { ...filtersData.where }
            });
        }

        return posts;

    }





}