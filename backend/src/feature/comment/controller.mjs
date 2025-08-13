import getPageStartEnd from "../../util/getPageStartEnd.mjs";
import { commentCreate, commentDelete, commentFindMany } from "./model.mjs";

export const getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const post_id = req.params.postId;
  console.log("postId param:", req.params.postId);
  const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

  try {
    const result = await commentFindMany(pageStart, pageEnd, Number(post_id));
    if (!result) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const content = req.body.content;
  const customer_id = req.body.customerId;
  const post_id = req.body.postId;
  if (!post_id || !customer_id || !content)
    return res.status(400).json({ error: "Bad Request" });

  const comment = {
    post_id,
    customer_id,
    content,
  };

  try {
    const result = await commentCreate(comment);
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(400).json({ error: e.stack });
  }
};

export const updateOne = async (req, res) => {
  const comment_id = Number(req.params.comment_id);
  const content = req.body.content;
  const customer_id = Number(req.params.customer_id);
  const post_id = Number(req.params.post_id);

  if (!comment_id || !content) return res.status(400).json({ error: "Bad Request" });

  try {
    const result = await commentUpdate({comment_id, content, customer_id, post_id})
    return res.status(200).json({ data: result });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    )
      return res.status(400).json({ error: e.stack });
    return res.status(500).json({ error: e.stack });
  }
};

export const deleteOne = async (req, res) => {
  const commentId = Number(req.params.commentId)

  if (!commentId)
    return res.status(400).json({ error: "Bad Request" });

  try {
    const result = await commentDelete({commentId});
    return res.status(200).json({ data: result });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    )
      return res.status(400).json({ error: e.stack });
    return res.status(500).json({ error: e.stack });
  }
};