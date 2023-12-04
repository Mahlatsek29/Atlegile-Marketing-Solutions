import React from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";

export default function ReviewsCard({ review }) {
  return (
    <>
      <Box sx={{ pl: 3,mb:6 }}>
        <Rating
          name="half-rating-read"
          defaultValue={review.ratings}
          precision={0.5}
          readOnly
        />
        <Box>
          <Typography>{review.comment}</Typography>
        </Box>
        <Box>
          <Typography sx={{fontWeight:600,fontSize:22}}>{review.userName} {" "} {review.userSurname}</Typography>
        </Box>
        <Box>
          <Typography sx={{color:"#5abcf4",fontSize:15}}>{review.role}</Typography>
        </Box>
      </Box>
    </>
  );
}
