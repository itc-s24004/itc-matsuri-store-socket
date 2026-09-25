const { PORT, MAIN_SERVER } = process.env;

if (!PORT) throw new Error("env: PORT が指定されていません");
if (!MAIN_SERVER) throw new Error("env: MAIN_SERVER が指定されていません");


export const APP_ENV = {
    PORT,
    MAIN_SERVER
}