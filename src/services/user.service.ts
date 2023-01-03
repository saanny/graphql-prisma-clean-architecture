import { PrismaClient } from "@prisma/client";
import { IUserService } from "../domain/IUserService";
import { User } from "../domain/user.entitiy";
import { UserFiltersDTO } from "../dto/filters.dto";
import { CreateUserDTO } from "../dto/user.dto";
import { prisma } from "../infrastructure/prisma";

export class UserService implements IUserService {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = prisma;
    }

    async save(user: CreateUserDTO): Promise<User> {
        return this.prismaClient
            .user.create({
                data: {
                    ...user
                }
            })
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
                    role: true,
                },
            }

            users = await this.prismaClient.user.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }
            });

        } else {
            users = await this.prismaClient.user.findMany({
                where: { ...filtersData.where }
            });
        }

        return users;

    }





}