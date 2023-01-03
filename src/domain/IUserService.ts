import { User } from "@prisma/client";
import { UserFiltersDTO } from "../dto/filters.dto";
import { CreateUserDTO } from "../dto/user.dto";

export interface IUserService {
    save(user: CreateUserDTO): Promise<User>
    getAll(filters: UserFiltersDTO): Promise<Array<User>>;
}
