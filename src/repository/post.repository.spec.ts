import { PostRepository } from './post.repository'
import { PostStatus } from '@prisma/client';
import { Prisma } from '../dataSource/prisma.datasource';

describe('post repository', () => {
    let repository: PostRepository;
    let prisma: Prisma;

    beforeEach(() => {
        prisma = new Prisma();
        repository = new PostRepository(prisma);
    });

    afterAll(() => {
        prisma.prisma.$disconnect();
    });

    test('can create an instance of post repository ', async () => {
        expect(repository).toBeDefined();
    });
    test('should create new post with normal data', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",

        }
        const post = await repository.save(postData)

        expect(post).toBeDefined();
    });



    test('should find all posts without any filters', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await repository.save(postData)
        await repository.save(postData)
        await repository.save(postData)

        const posts = await repository.getAll({})

        expect(posts).toBeDefined();
    });

    test('should find all posts with custom where fields', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await repository.save(postData)
        await repository.save(postData)
        await repository.save(postData)

        const posts = await repository.getAll({
            where: {
                content: "test"
            }
        })

        expect(posts).toBeDefined();
    });

    test('should return empty array if the filters value is not in database', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await repository.save(postData)
        await repository.save(postData)
        await repository.save(postData)

        const posts = await repository.getAll({
            where: {
                content: "test with no data haha"
            }
        })

        expect(posts.length).toEqual(0);
    });

    test('should return post grouped by status', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        await repository.save(postData)
        await repository.save(postData)
        await repository.save(postData)

        const posts = await repository.getAll({
            groupBy: {
                field: "status"
            }
        })

        expect(posts).toBeDefined();
    });



});