import express, { Application } from "express";
import morgan from "morgan";
import PostRouter from "./routes/post.router";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.router();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  router() {
    this.app.use(PostRouter);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server is running on port", this.app.get("port"));
  }
}
