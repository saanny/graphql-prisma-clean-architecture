import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { Container } from "typedi";

export class Apollo {
    private _apolloServer!: ApolloServer;


    public async create(resolvers: any = []) {

        this._apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: resolvers,
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