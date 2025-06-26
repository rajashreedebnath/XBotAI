import { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Stack, Typography, Divider } from "@mui/material";
import ChatFilter from "../../components/ChatFilter/ChatFilter";
import ChatHistoryCard from "../../components/ChatHistoryCard/ChatHistoryCard";

function History() {
  const [conversation, setConversation] = useState([]);
  const [filterChats, setFilterChats] = useState([]);

  useEffect(() => {
    const conversations = localStorage.getItem("conversation") || "[]";

    setConversation(JSON.parse(conversations));
    setFilterChats(JSON.parse(conversations));
  }, []);

  return (
    <Stack>
      <Navbar />

      <Box p={{ xs: 2, md: 3 }}>
        <Typography variant="h2" component={"h2"} textAlign={"center"}>
          Conversation History
        </Typography>

        {conversation.length > 0 ? (
          <ChatFilter allChats={conversation} setFilterChats={setFilterChats} />
        ) : null}

        {conversation.length == 0 ? (
          <Typography textAlign={"center"} p={2} bgcolor={"primary.light"}>
            No saved chats.
          </Typography>
        ) : null}

        {conversation.length > 0 && filterChats.length == 0 ? (
          <Typography textAlign={"center"} p={2} bgcolor={"primary.light"}>
            No such chats.
          </Typography>
        ) : null}

        {filterChats.length > 0 && (
          <Stack
            spacing={4}
            divider={
              <Divider sx={{ borderColor: "primary.bg", opacity: 0.4 }} />
            }
          >
            {filterChats.map((item, index) => (
              <ChatHistoryCard details={item} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
export default History;
