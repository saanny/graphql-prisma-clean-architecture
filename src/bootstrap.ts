import "reflect-metadata";
import { Container } from "inversify";
import { PostResolver } from "./domain/post.resolver";
import { UserResolver } from "./domain/user.resolver";
import { Apollo } from "./infrastructure/graphql";
import { Server } from "./infrastructure/http";


export async function bootstrap() {
    const server = new Server();
    const container = new Container();


    const apolloServer = new Apollo(server.app, [PostResolver, UserResolver]);

    await apolloServer.run();
    await server.run(8000);

}

bootstrap();