import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import config from "../../drizzle.config";
import * as schema from "./schema";

const client = createClient({url: config.dbCredentials.url});

//* fa un mapping objecto-relacional amb l'esquema --> m'agafa la base de dades i me'l converteix en un objecte
export const db = drizzle(client, {schema});