import "reflect-metadata";
import { PostResolver } from "./domain/post.resolver";
import { UserResolver } from "./domain/user.resolver";
import { Apollo } from "./application/graphql";
import { Server } from "./application/http";


export async function bootstrap() {
    const server = new Server();
    const apolloServer = new Apollo(server.app, [PostResolver, UserResolver]);
    await apolloServer.run();
    await server.run(8000);

}

bootstrap();