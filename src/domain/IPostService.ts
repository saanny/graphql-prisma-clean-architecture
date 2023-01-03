import { Post } from "@prisma/client";
import { PostFiltersDTO } from "../dto/filters.dto";
import { CreatePostDTO } from "../dto/post.dto";

export interface IPostService {
    save(post: CreatePostDTO): Promise<Post>
    getAll(filters: PostFiltersDTO): Promise<Array<Post>>;
}
