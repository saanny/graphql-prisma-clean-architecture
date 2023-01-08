import "reflect-metadata";
import { Prisma } from '../dataSource/prisma.datasource';
import { UserResolver } from './user.resolver'
import { UserRepository } from '../repository/user.repository';
import { UserRole } from "@prisma/client";

describe('user resolver', () => {
    let resolver: UserResolver;
    let repository: UserRepository;
    let dataSource: Prisma;

    beforeEach(async () => {
        dataSource = new Prisma();
        repository = new UserRepository(dataSource)
        resolver = new UserResolver(repository);

    });

    afterAll(async () => {
        await dataSource.prisma.$disconnect();
    });
    test('can create an instance of post repository ', async () => {
        expect(resolver).toBeDefined();
    });

    test('should create new user with normal data', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        const post = await resolver.createUser(userData)

        expect(post).toBeDefined();
    });

    test('should find all users without any filters', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        await resolver.createUser(userData)
        await resolver.createUser(userData)
        await resolver.createUser(userData)

        const posts = await resolver.getAllUsers({})

        expect(posts).toBeDefined();
    });

});