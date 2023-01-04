import "reflect-metadata";
import { PostResolver } from "./domain/post.resolver";
import { UserResolver } from "./domain/user.resolver";
import { Apollo } from "./application/graphql";
import { Server } from "./application/http";


export async function bootstrap() {

    const apollo = new Apollo();
    await apollo.factory([PostResolver, UserResolver]);
    const server = new Server(apollo.apolloServer);
    await server.run(8000);

}

bootstrap();