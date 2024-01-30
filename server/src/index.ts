import { PORT, MONGO_DB_URL } from "./env";
import { createServer } from "./server";
import mongoose from "mongoose";

const app = createServer();

app.listen(PORT, () => {
    return console.log(`Server is running on PORT: ${PORT}`);
});

mongoose.Promise = Promise;
mongoose
    .connect(MONGO_DB_URL)
    .then((d: typeof mongoose) => console.log("Database connected succesfully:", d.connection.name))
    .catch((e: Error) => console.log(e));
