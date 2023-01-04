import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

import { Container } from "typedi";

export class Apollo {
    private _apolloServer!: ApolloServer;


    constructor(private resolvers: any = []) {

    }
    public async create() {

        this._apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: this.resolvers,
                validate: false,
                container: Container
            }),
        });

        await this._apolloServer.start()
            .then(() => {
                console.log(`Graphql server running on route http://localhost:8000/graphql`)
            })
            .catch((error) => {
                console.log(error)
            });

    }
    public get apolloServer() {
        return this._apolloServer;
    }



}