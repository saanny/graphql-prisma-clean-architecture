import "reflect-metadata";
import { Prisma } from '../dataSource/prisma.datasource';
import { PostResolver } from './post.resolver'
import { PostRepository } from '../repository/post.repository';
import { PostStatus } from "@prisma/client";

describe('post resolver', () => {
    let resolver: PostResolver;
    let repository: PostRepository;
    let prisma: Prisma;

    beforeEach(() => {
        prisma = new Prisma();
        repository = new PostRepository(prisma)
        resolver = new PostResolver(repository);
    });

    afterAll(() => {
        prisma.prisma.$disconnect();
    });
    test('can create an instance of post repository ', async () => {
        expect(resolver).toBeDefined();
    });

    test('should create new post with normal data', async () => {
        const postData = {
            authorId: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",

        }
        const post = await resolver.createPost(postData)

        expect(post).toBeDefined();
    });

    test('should find all posts without any filters', async () => {
        const postData = {
            authorId: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await resolver.createPost(postData)
        await resolver.createPost(postData)
        await resolver.createPost(postData)

        const posts = await resolver.getAllPosts({})

        expect(posts).toBeDefined();
    });

});