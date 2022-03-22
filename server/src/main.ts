import { createServer } from "./functions/create-server.function"

createServer(parseInt(process.env.PORT) || 4000)