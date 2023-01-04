import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import { Application } from 'express'


export class Apollo {
    private apolloServer?: ApolloServer;
    private expressApp: Application;

    constructor(expressApp: Application, private schema: any = [], private contianer: any) {
        this.expressApp = expressApp;
    }
    public async run() {

        this.apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: this.schema,
                validate: false,
                container: this.contianer
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