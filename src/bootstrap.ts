import "reflect-metadata";
import { Apollo } from "./infrastructure/graphql";
import { Server } from "./infrastructure/http/server";

export async function bootstrap() {
    const server = new Server();
    const apolloServer = new Apollo(server.app);
    await apolloServer.run();
    await server.run(8000);

}

bootstrap();