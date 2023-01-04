import "reflect-metadata";
import { Container } from "inversify";
import { PostResolver } from "./domain/post.resolver";
import { UserResolver } from "./domain/user.resolver";
import { Apollo } from "./infrastructure/graphql";
import { Server } from "./infrastructure/http";
import { UserService } from "./services/user.service";
import { Prisma } from "./infrastructure/driver";

export async function bootstrap() {
    const server = new Server();
    const container = new Container();

    container.bind(Prisma).toSelf();
    container.bind(UserService).toSelf();

    const apolloServer = new Apollo(server.app, [PostResolver, UserResolver], container);

    await apolloServer.run();
    await server.run(8000);

}

bootstrap();