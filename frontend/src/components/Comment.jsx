import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCommentStore } from "../store";

export default function Comment(props) {
  const { getComments, deleteComment} = useCommentStore();
  const { customer, content, comment_id, post_id } = props.comment
  console.log(comment_id, post_id)
  const firstName = customer.first_name
  const lastName = customer.last_name
  const commentor = firstName + ' ' + lastName

  const handleDeleteComment = async() => {
    await deleteComment(comment_id)
    await getComments(post_id, 10, 1)
  }

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
          <Typography variant="body2">
            {content}
          </Typography>
          <Button onClick={() => handleDeleteComment()}>Delete</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
