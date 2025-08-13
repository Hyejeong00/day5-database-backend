import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCommentStore } from "../store";
import { useState } from "react";

export default function Comment(props) {
  const { getComments, updateComment, deleteComment } = useCommentStore();
  const { customer, customer_id, content, comment_id, post_id } = props.comment;
  console.log(props.comment)
  const firstName = customer.first_name;
  const lastName = customer.last_name;
  const commentor = firstName + ' ' + lastName;

  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(content ?? "");

  const handleUpdateComment = async () => {
    if (comment.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    await updateComment(customer_id, post_id, comment_id, comment);
    await getComments(post_id, 10, 1);
    setIsEditing(false);
  };

  const handleDeleteComment = async () => {
    await deleteComment(comment_id);
    await getComments(post_id, 10, 1);
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {commentor}
          </Typography>

          {isEditing ? (
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          ) : (
            <Typography variant="body2">{content}</Typography>
          )}

          {isEditing ? (
            <>
              <Button onClick={handleUpdateComment}>Save</Button>
              <Button onClick={() => {
                setIsEditing(false);
                setComment(content); // 원래대로 복구
              }}>Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)}>Update</Button>
              <Button onClick={handleDeleteComment}>Delete</Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
