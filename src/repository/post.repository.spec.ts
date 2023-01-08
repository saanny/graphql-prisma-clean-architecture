import { PostRepository } from './post.repository'
import { UserRepository } from './user.repository'
import { PostStatus, UserRole } from '@prisma/client';
import { Prisma } from '../dataSource/prisma.datasource';

describe('post repository', () => {
    let repository: PostRepository;
    let userRepository: UserRepository;
    let dataSource: Prisma;

    beforeEach(async () => {
        dataSource = new Prisma();
        repository = new PostRepository(dataSource);
        userRepository = new UserRepository(dataSource)


    });

    afterAll(async () => {
        await dataSource.prisma.$disconnect();
    });

    test('can create an instance of post repository ', async () => {
        expect(repository).toBeDefined();
    });
    test('should create new post with normal data', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userRepository.save(userData)

        const postData = {
            authorId: user.id,
            content: "test",
            status: PostStatus.Archived,
            title: "test",
        }
        const post = await repository.save(postData)

        expect(post).toBeDefined();
    });



    test('should find all posts without any filters', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userRepository.save(userData)

        const postData = {
            authorId: user.id,
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
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userRepository.save(userData)

        const postData = {
            authorId: user.id,
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
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userRepository.save(userData)

        const postData = {
            authorId: user.id,
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
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const user = await userRepository.save(userData)

        const postData = {
            authorId: user.id,
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