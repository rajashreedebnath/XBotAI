import { Button, Stack, useMediaQuery, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import icon from "../../assets/newchat.png";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Link } from "react-router-dom";

function Sidebar({ closeMenu, setChat }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mode, setMode] = useContext(ThemeContext);

  return (
    <Stack direction="column" spacing={2}>
      {isMobile ? (
        <Button
          endIcon={<CloseIcon />}
          onClick={closeMenu}
          sx={{
            color: mode == "light" ? "primary.dark" : "text.primary",
            justifyContent: "flex-end",
          }}
        >
          Close
        </Button>
      ) : null}

      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
          sx={{
            bgcolor: "primary.main",
            "&:hover ": {
              bgcolor: "primary.bg",
            },
          }}
          onClick={() => {
            setChat([]);
            closeMenu();
          }}
        >
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Box
              component="img"
              src={icon}
              borderRadius={"50%"}
              width={40}
              height={40}
            ></Box>

            <Typography variant="h5" fontSize={20} color={"text.primary"}>
              New Chat
            </Typography>
          </Stack>
          <AddCommentIcon />
        </Stack>
      </Link>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Link to={"/history"}>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 2, mx: 4, alignSelf: "center" }}
            onClick={closeMenu}
          >
            Past Conversations
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}

export default Sidebar;
