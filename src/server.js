import express from "express";
import routes from "./routes.js";
import  mongoose  from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(routes);
app.listen(3000, () => {
    console.log("Servidor na 3000");
});

export default app;