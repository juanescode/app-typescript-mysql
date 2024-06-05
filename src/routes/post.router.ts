import { Router } from "express";
const router = Router();
import * as ctrlPost from "../controllers/post.controller";

router.route("/post").get(ctrlPost.getPosts);

router.route("/post/:id").get(ctrlPost.getPost);

router.route("/post").post(ctrlPost.createPost);

router.route("/post/:id").patch(ctrlPost.updatePost);

router.route("/post/:id").delete(ctrlPost.deletePost);

export default router;

