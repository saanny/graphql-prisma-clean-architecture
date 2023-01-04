import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import { Application } from 'express'
import { Container } from "typedi";

export class Apollo {
    private apolloServer?: ApolloServer;
    private expressApp: Application;

    constructor(expressApp: Application, private resolvers: any = []) {
        this.expressApp = expressApp;
    }
    public async run() {

        this.apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: this.resolvers,
                validate: false,
                container: Container
            }),
        });

        await this.apolloServer.start()
            .then(() => {
                console.log(`Graphql server running on route http://localhost:8000/graphql`)
            })
            .catch((error) => {
                console.log(error)
            });

        this.expressApp.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(this.apolloServer));
    }



}