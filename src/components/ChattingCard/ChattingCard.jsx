import { Box, IconButton, Stack, Typography, Rating } from "@mui/material";
import ai from "../../assets/bot.png";
import human from "../../assets/person.png";
import { format } from "date-fns";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useEffect, useState } from "react";

function ChattingCard({
  details,
  readOnly = false,
  setSelectedChatId,
  showFeedbackModal,
  setChat,
}) {
  const [isRating, setIsRating] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!isRating) return;
    setChat((prev) => {
      return prev.map((item) => {
        if (item.id === details.id) {
          return { ...item, rating: rating || 0 };
        }
        return { ...item };
      });
    });
  }, [rating]);

  return (
    <Stack
      direction={"row"}
      spacing={2}
      padding={2}
      borderRadius={2}
      boxShadow={"0 0 4px rgba(0,0,0,0.1)"}
      alignItems={"flex-start"}
      sx={{
        "&:hover .feedback-btns": {
          visibility: "visible",
          opacity: 1,
        },
      }}
      bgcolor={readOnly ? "primary.main" : "primary.light"}
    >
      <Box
        component={"img"}
        src={details.type == "AI" ? ai : human}
        borderRadius={"50%"}
        width={75}
        height={75}
      ></Box>

      <Stack spacing={1} justifyContent={"center"}>
        <Box component={"span"} fontWeight={700} fontSize={{ xs: 14, md: 16 }}>
          {details.type == "AI" ? "Soul AI" : "You"}
        </Box>
        <Typography>{details.text}</Typography>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Typography fontSize={{ xs: 10, md: 12 }} color={"text.secondary"}>
            {format(details.time, "hh:mm a")}
          </Typography>

          {details.type == "AI" && !readOnly && (
            <Stack
              direction={"row"}
              visibility={{ xs: "visible", md: "hidden" }}
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "opacity 400ms ease",
              }}
              className="feedback-btns"
            >
              <IconButton
                size="small"
                onClick={() => setIsRating((prev) => !prev)}
              >
                {!isRating && <ThumbUpOffAltIcon fontSize="inherit" />}
                {isRating && <ThumbUpAltIcon fontSize="inherit" />}
              </IconButton>

              <IconButton
                size="small"
                onClick={() => {
                  setIsFeedback((prev) => !prev);
                  setSelectedChatId(details.id);
                  showFeedbackModal();
                }}
              >
                {!isFeedback && <ThumbDownOffAltIcon fontSize="inherit" />}
                {isFeedback && <ThumbDownAltIcon fontSize="inherit" />}
              </IconButton>
            </Stack>
          )}
        </Stack>

        {(isRating || details.rating > 0) && details.type == "AI" && (
          <Stack>
            <Typography
              component={"legend"}
              fontSize={{ xs: 10, md: 12 }}
              mb={0.5}
            >
              {readOnly ? "Rating:" : "Rate this reponse:"}
            </Typography>
            <Rating
              name="simple-controlled"
              value={readOnly ? details.rating : rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                console.log(newValue);
              }}
              sx={{
                width: "150px",
              }}
              readOnly={readOnly}
            />
          </Stack>
        )}

        {details.feedback && (
          <Typography pt={1} fontSize={{ xs: 10, md: 16 }}>
            <Box component={"span"} fontWeight={600}>
              Feedback:
            </Box>
            <Box component={"span"}>{` ${details.feedback}`}</Box>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default ChattingCard;
