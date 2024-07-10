import { env } from "./env/index";
import { app } from "./app";

app.listen({
    host:"0.0.0.0",
    port: env.PORT
}).then(() => {
    console.log(`HTTP server running on port: ${env.PORT}`);
})

