import express from "express";

export class Server {
    private _app = express();

    public async run(port: number) {
        this._app.use(express.json());


        this._app.listen(port, () =>
            console.log(`server is running on http://localhost:${port}`)
        )
    }
    public get app() {
        return this._app;
    }


}