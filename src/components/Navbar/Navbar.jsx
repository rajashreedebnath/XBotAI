import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import { Link, useOutletContext } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function Navbar() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mode, setMode] = useContext(ThemeContext);
  const { handleMobileMenu } = useOutletContext();

  return (
    <Stack
      component={"header"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={3}
    >
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        {isMobile ? (
          <MenuIcon onClick={() => handleMobileMenu((prev) => !prev)} />
        ) : null}

        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h1" component="h1">
            Bot AI
          </Typography>
        </Link>
      </Stack>

      <Stack direction={"row"} spacing={0.2} alignItems={"center"}>
        <Typography fontSize={10} textTransform={"capitalize"}>
          {mode}
        </Typography>
        <IconButton
          onClick={() =>
            setMode((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          {mode == "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Navbar;
