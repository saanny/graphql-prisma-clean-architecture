import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { Post } from "./post.entity";
import { CreatePostDTO } from "../dto/post.dto";
import { PostFiltersDTO } from "../dto/filters.dto";
import { PostService } from "../services/post.service";

@Resolver()
export class PostResolver {
    constructor(private postService: PostService) {
        this.postService = new PostService();
    }

    @Query(() => [Post])
    async getAllPosts(@Arg("filters") filters: PostFiltersDTO): Promise<Post[]> {
        const posts = await this.postService.getAll(filters);
        return posts;
    }

    @Mutation(() => Post!)
    async createPost(@Arg("input") input: CreatePostDTO): Promise<Post> {
        return this.postService.save(input);
    }
}