import { Box, Button, Stack, TextField, Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function ChatInput({ generateResponse, chat, clearChat, setScroll }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateResponse(input);
    setInput("");
    setScroll((prev) => !prev);
  };

  const handleSave = (e) => {
    const chat_history = JSON.parse(localStorage.getItem("conversation")) || [];
    const date = new Date();

    localStorage.setItem(
      "conversation",
      JSON.stringify([{ chat: chat, datetime: date }, ...chat_history])
    );

    clearChat();

    setShowSnackbar(true);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Stack direction={"row"} spacing={2} padding={1}>
        <TextField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Bot AI..."
          sx={{
            borderRadius: 2,
            bgcolor: "primary.light",
            flex: 1,
          }}
          required
          inputRef={inputRef}
        ></TextField>

        <Button variant="contained" type="submit" sx={{ px: 2, fontSize: 15 }}>
          Ask
        </Button>

        <Button
          variant="outlined"
          onClick={handleSave}
          sx={{ px: 2, fontSize: 15 }}
        >
          Save
        </Button>

        <Snackbar
          open={showSnackbar}
          message={"Chat saved."}
          onClose={() => setShowSnackbar(false)}
          autoHideDuration={5000}
          action={
            <Link to="/history">
              <Button size="small">See past conversations</Button>
            </Link>
          }
        />
      </Stack>
    </Box>
  );
}

export default ChatInput;
