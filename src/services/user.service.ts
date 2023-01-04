
import { UserFiltersDTO } from "../dto/filters.dto";
import { CreateUserDTO } from "../dto/user.dto";
import { Prisma } from "../infrastructure/driver";
import { Service } from "typedi";
import { User } from "@prisma/client";
@Service()
export class UserService {

    public constructor(private readonly _prismaClient: Prisma) { }

    async save(user: CreateUserDTO): Promise<User> {

        return this._prismaClient
            .prisma.user.create({
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

            users = await this._prismaClient.prisma.user.groupBy({
                ...filtersData.groupBy,
                where: { ...filtersData.where }
            });

        } else {
            users = await this._prismaClient.prisma.user.findMany({
                where: { ...filtersData.where }
            });
        }

        return users;

    }





}