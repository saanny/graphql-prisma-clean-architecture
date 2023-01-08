import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { GroupByPost, Post } from "./post.model";
import { CreatePostDTO } from "../dto/post.dto";
import { PostFiltersDTO } from "../dto/filters.dto";
import { Service } from "typedi";
import { PostRepository } from "../repository/post.repository";

@Service()
@Resolver()
export class PostResolver {
    private postRepository: PostRepository;
    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    @Query(() => [Post])
    async getAllPosts(@Arg("filters") filters: PostFiltersDTO): Promise<Array<Post | GroupByPost>> {

        const posts = await this.postRepository.getAll(filters);
        return posts;
    }

    @Mutation(() => Post!)
    async createPost(@Arg("input") input: CreatePostDTO): Promise<Post> {
        return this.postRepository.save(input);
    }
}