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

export const deleteOne = async (req, res) => {
  const commentId = Number(req.params.commentId)
   console.log("Delete commentId:", commentId);

  if (!commentId)
    return res.status(400).json({ error: "Bad Request" });

  try {
    const result = await commentDelete({commentId});
    return res.status(200).json({ data: result });
  } catch (e) {
    console.error("Delete error:", e);  // e.stack 대신 e로 바꿔서 전체 메시지 보기
    if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    )
      return res.status(400).json({ error: e.stack });
    return res.status(500).json({ error: e.stack });
  }
};