import { Typography, Box, Stack, Button, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import {ThemeContext} from '../../theme/ThemeContext';
import icon from '../../assests/bot.png';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export default function Sidebar({setChat, closeMenu}){
    const {mode, setMode} = useContext(ThemeContext);
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
    <Box>
      {isMobile && (
        <Box
          width={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            endIcon={<CloseIcon />}
            sx={{
              justifyContent: "flex-end",
              color: mode === "light" ? "primary.dark" : "text.primary",
            }}
            onClick={closeMenu}
          >
            Close
          </Button>
        </Box>
      )}

      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Stack
          onClick={() => {
            setChat([]);
            closeMenu();
          }}
          sx={{
            bgcolor: "primary.main",
            "&:hover ": {
              bgcolor: "primary.bg",
            },
          }}
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={2}
          px={{ xs: 2, md: 3 }}
        >
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Box
              component={"img"}
              src={icon}
              height={42}
              width={42}
              borderRadius={2}
              boxShadow={4}
              flexShrink={0}
            />
            <Typography
              variant={"heading"}
              fontSize={{ xs: 16, md: 20 }}
              color={"text.primary"}
            >
              New Chat
            </Typography>
          </Stack>

          <AddCommentIcon sx={{ color: "text.primary" }} />
        </Stack>
      </Link>

      <Box p={{ xs: 2, md: 3 }}>
        <Link to={"/history"}>
          <Button variant="contained" sx={{ width: 1 }} onClick={closeMenu}>
            Past Conversations
          </Button>
        </Link>
      </Box>
    </Box>
  );
}