import {Handler} from "@netlify/functions";

const Sheets = require("node-sheets").default;

const sheetID = '1JuGG_aJRgDIXUGXUerOzIfMblRB58qpug1EH9qEUuuE';


const handler: Handler = async (event, context) => {
    try {
        const auth = process.env.ACCESS_TOKEN;
        const access = JSON.parse(auth);
        access.private_key = access.private_key.replace(/\\n/gm, '\n');

        const gs = new Sheets(sheetID);
        await gs.authorizeJWT(access);
        const table = await gs.tables("Sheet1!A:E");

        return {
            statusCode: 200,
            body: JSON.stringify({
                table
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e
            })
        }
    }
};

export {handler};