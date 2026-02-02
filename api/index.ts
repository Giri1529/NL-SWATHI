import { app, setup } from "../server/index";

export default async function handler(req: any, res: any) {
    await setup;
    app(req, res);
}
