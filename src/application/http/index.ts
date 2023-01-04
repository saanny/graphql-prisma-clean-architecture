import express from "express";
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from "@apollo/server";

export class Server {
    private _app = express();
    private _apolloServer: ApolloServer;

    constructor(apolloServer: ApolloServer) {
        this._apolloServer = apolloServer
    }
    public async run(port: number) {
        this._app.use(express.json());

        this._app.use('/graphql', cors<cors.CorsRequest>(), expressMiddleware(this._apolloServer));

        this._app.listen(port, () =>
            console.log(`server is running on http://localhost:${port}`)
        )
    }


}