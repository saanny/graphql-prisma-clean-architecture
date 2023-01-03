import { UserFiltersDTO } from "../dto/filters.dto";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "./user.entitiy";

export interface IUserRepository {
    save(user: CreateUserDTO): Promise<User>
    getAll(filters: UserFiltersDTO): Promise<Array<User>>;
}
