import { Post, PostStatus } from "@prisma/client";
import { Service } from "typedi";
import { PostFiltersDTO } from "../dto/filters.dto";
import { CreatePostDTO } from "../dto/post.dto";
import { Prisma } from "../dataSource/prisma.datasource";
import { GroupByPost } from "../domain/post.model";
import { ofType } from "../common/types";


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

    async getAll(filters: PostFiltersDTO): Promise<Array<Post | GroupByPost>> {

        let posts: Array<Post | GroupByPost> = [];

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
                ...filtersData.groupBy
            });

            posts = posts.map((item: any) => {
                return ofType<GroupByPost>({
                    count: item._count.status,
                    status: item.status
                })
            })
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