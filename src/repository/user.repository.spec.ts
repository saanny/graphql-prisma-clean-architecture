import { UserRepository } from './user.repository'
import { UserRole } from '@prisma/client';
import { Prisma } from '../dataSource/prisma.datasource';

describe('post repository', () => {
    let repository: UserRepository;

    let dataSource: Prisma;

    beforeEach(async () => {
        dataSource = new Prisma();
        repository = new UserRepository(dataSource);
    });

    afterAll(async () => {
        await dataSource.prisma.$disconnect();
    });


    test('can create an instance of user repository ', async () => {
        expect(repository).toBeDefined();
    });

    test('should create new user with normal data', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }

        const user = await repository.save(userData)

        expect(user).toBeDefined();
    });

    test('should find all users without any filters', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        await repository.save(userData)
        await repository.save(userData)
        await repository.save(userData)

        const users = await repository.getAll({})

        expect(users).toBeDefined();
    });

    test('should find all users custom with custom where fields', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        await repository.save(userData)
        await repository.save(userData)
        await repository.save(userData)

        const users = await repository.getAll({
            where: {
                name: "Amir Ahmadi"
            }
        })

        expect(users).toBeDefined();
    });

    test('should return empty array if the filters value is not in database', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        await repository.save(userData)
        await repository.save(userData)
        await repository.save(userData)

        const users = await repository.getAll({
            where: {
                name: "test test"
            }
        })

        expect(users.length).toEqual(0);
    });

    test('should return user grouped by roles', async () => {
        const userData = {
            email: "test@gmail.com",
            name: "Amir Ahmadi",
            role: UserRole.Author
        }
        await repository.save(userData)
        await repository.save(userData)
        await repository.save(userData)

        const users = await repository.getAll({
            groupBy: {
                field: "role"
            }
        })

        expect(users).toBeDefined();
    });


});