
import { UserFiltersDTO } from "../dto/filters.dto";
import { CreateUserDTO } from "../dto/user.dto";
import { Prisma } from "../dataSource/prisma.datasource";
import { Service } from "typedi";
import { User } from "@prisma/client";
@Service()
export class UserRepository {

    public constructor(private readonly dataSource: Prisma) { }

    async save(user: CreateUserDTO): Promise<User> {
        const newUser = await this.dataSource
            .prisma.user.create({
                data: {
                    ...user
                }
            });
        return newUser
    }

    async getAll(filters: UserFiltersDTO): Promise<Array<any>> {

        let users: Array<User> = [];

        const filtersData: any = {}

        if (filters?.where?.email) {
            filtersData.where = { ...filtersData?.where, email: filters.where?.email }
        }
        if (filters?.where?.name) {
            filtersData.where = { ...filtersData?.where, name: filters?.where?.name }
        }
        if (filters?.where?.role) {
            filtersData.where = { ...filtersData?.where, role: filters?.where?.role }
        }

        if (filters?.groupBy?.field) {
            filtersData.groupBy = {
                by: [filters?.groupBy?.field],
                _count: {
                    [filters?.groupBy?.field]: true,
                },
            }

            users = await this.dataSource.prisma.user.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }

            });

        } else {
            users = await this.dataSource.prisma.user.findMany({
                where: { ...filtersData.where },
                include: {
                    posts: true
                }
            });
        }

        return users;

    }





}