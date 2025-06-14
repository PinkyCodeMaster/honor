import { defineConfig } from "drizzle-kit";
import env from "./src/env.js";
export default defineConfig({
    schema: "./src/db/schema",
    out: "./src/db/migrations",
    dialect: "sqlite",
    driver: "turso",
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN,
    },
});
