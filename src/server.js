import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { conectMongoDB } from "./db/connectToMongoDB.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/usersRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import goodsRouter from "./routes/goodsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";
import feedbacksRouter from "./routes/feedbacksRouter.js";
import subscriptionsRouter from "./routes/subscriptionsRouter.js";

const PORT = process.env.PORT ?? 3000;

const swaggerDocument = YAML.parse(
  fs.readFileSync(new URL("../docs/openapi.yaml", import.meta.url), "utf8"),
);

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(helmet());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/feedbacks', feedbacksRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await conectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});