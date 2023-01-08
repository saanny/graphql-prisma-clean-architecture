import "reflect-metadata";
import { Prisma } from '../dataSource/prisma.datasource';
import { PostResolver } from './post.resolver'
import { PostRepository } from '../repository/post.repository';
import { UserResolver } from './user.resolver'
import { UserRepository } from '../repository/user.repository'
import { PostStatus, UserRole } from "@prisma/client";

describe('post resolver', () => {
    let postResolver: PostResolver;
    let postRepository: PostRepository;

    let userResolver: UserResolver;
    let userRepository: UserRepository;

    let dataSource: Prisma;

    beforeEach(async () => {
        dataSource = new Prisma();

        postRepository = new PostRepository(dataSource)
        postResolver = new PostResolver(postRepository);

        userRepository = new UserRepository(dataSource)
        userResolver = new UserResolver(userRepository);

    });

    afterAll(async () => {
        await dataSource.prisma.$disconnect();
    });

    test('can create an instance of post repository ', async () => {
        expect(postResolver).toBeDefined();
    });

    test('should create new post with normal data', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userResolver.createUser(userData);

        const postData = {
            authorId: user.id,
            content: "test",
            status: PostStatus.Archived,
            title: "test",

        }
        const post = await postResolver.createPost(postData)

        expect(post).toBeDefined();
    });

    test('should find all posts without any filters', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userResolver.createUser(userData);

        const postData = {
            authorId: user.id,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await postResolver.createPost(postData)
        await postResolver.createPost(postData)
        await postResolver.createPost(postData)

        const posts = await postResolver.getAllPosts({})

        expect(posts).toBeDefined();
    });

});