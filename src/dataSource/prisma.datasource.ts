import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class Prisma {
    private prismaClient: PrismaClient;
    constructor() {
        this.prismaClient = new PrismaClient();
    }
    public get prisma() {
        return this.prismaClient;
    }
}

