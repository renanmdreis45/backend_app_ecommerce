import { AppDataSource } from "./data-source"
import * as express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

import { errorHandler } from "./middleware/error.middleware";
import { userRouter } from "./routes/user.routes";
import { purchaseRouter } from "./routes/purchase.routes";

const app = express();
app.use(express.json());
app.use(errorHandler);

const {PORT} = process.env;

app.use(userRouter);
app.use(purchaseRouter);

  AppDataSource.initialize()
    .then(async () => {
      app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
      });
      console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));
