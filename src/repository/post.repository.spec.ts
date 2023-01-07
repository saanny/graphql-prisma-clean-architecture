import { PostRepository } from './post.repository'
import { PostStatus } from '@prisma/client';
import { Prisma } from '../dataSource/prisma.datasource';

describe('post repository', () => {
    let repository: PostRepository;


    beforeEach(() => {
        repository = new PostRepository(new Prisma());
    })

    test('should create new post ', async () => {
        const postData = {
            author: 1,
            content: "test",
            status: PostStatus.Archived,
            title: "test",

        }
        const post = await repository.save(postData)

        expect(post).toBeDefined();
    });

    it('can create an instance of post repository ', async () => {
        expect(repository).toBeDefined();
    });

    test('should find all posts ', async () => {
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

    test('should find all posts custom where filters', async () => {
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

    test('should return empty array if the filter value is not in database', async () => {
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

    test('should return user grouped by status', async () => {
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
        console.log(posts)
        expect(posts).toBeDefined();
    });



});