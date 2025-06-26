import { Stack, Typography } from "@mui/material";
import { format, isEqual, startOfDay, add } from "date-fns";
import ChattingCard from "../ChattingCard/ChattingCard";

function ChatHistoryCard({ details }) {
  const formatDate = (date) => {
    const today = startOfDay(new Date());

    if (isEqual(date, today)) {
      return `Today's chats`;
    } else if (isEqual(today, add(date, { days: 1 }))) {
      return `Yesterday's chats`;
    } else {
      return format(date, "do LLL yyyy");
    }
  };

  const renderedChats = details.chat.map((item, index) => {
    return <ChattingCard details={item} readOnly={true} key={index} />;
  });

  return (
    <Stack spacing={2}>
      <Typography fontWeight={700}>
        {formatDate(startOfDay(new Date(details.datetime)))}
      </Typography>

      <Stack spacing={2}>{renderedChats}</Stack>
    </Stack>
  );
}

export default ChatHistoryCard;
