import { useEffect, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './theme/ThemeContext';
import { CssBaseline, Grid } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import { getThemePallete } from "./theme/ThemePallete";
import { Outlet } from "react-router-dom";

function App() {
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('theme') || "light");

  const theme = useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={[mode, setMode]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid container sx={{ background: "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))" }}>

          <Grid size={{ sm: 12, md: 2.5 }} sx={{
            bgcolor: 'primary.light',
            '@media (max-width:900px)': {
              width: '70%',
              transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 400ms ease',
            },
          }} height={"100vh"}
            position={{ xs: 'fixed', md: 'relative' }}
            zIndex={{ xs: 9999, md: 1 }}>
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>

          <Grid size={{ sm: 12, md: 9.5 }}>
            <Outlet context={{ chat: chat, setChat: setChat, handleMobileMenu: setMenuOpen }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>

  );
}

export default App;
