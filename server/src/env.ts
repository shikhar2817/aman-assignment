import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
export { PORT, MONGO_DB_URL };
