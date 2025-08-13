import express from "express";
import { createOne, deleteOne, getAll } from "./controller.mjs";

const router = express.Router();

router.get("/", getAll);
router.post("/", createOne);
router.delete("/:commentId", deleteOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
export const commentDeleteRouter = deleteOne
