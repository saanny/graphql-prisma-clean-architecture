import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { PostResolver } from '../../domain/post.resolver';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import { Application } from 'express'

export class Apollo {
    private apolloServer: any;
    private expressApp: Application;
    constructor(expressApp: Application) {
        this.expressApp = expressApp;
    }
    public async run() {
        this.apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [PostResolver],
                validate: false
            }),

        });
        await this.apolloServer.start();
        this.expressApp.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(this.apolloServer));
    }



}