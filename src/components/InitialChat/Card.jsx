import { Box, Typography, Stack, Paper, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Card({ heading, subtext, handleClick }) {
  return (
    <Paper
      elevation={2}
      bgcolor={"primary.light"}
      sx={{
        p: { xs: 1.5, md: 2 },
        "&:hover .MuiIconButton-root": {
          opacity: 1,
        },
        "&:hover": {
          bgcolor: "primary.bglight",
        },
        cursor: "pointer",

        transition: "background 200ms ease",
      }}
      onClick={()=>handleClick(heading)}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography
            variant="heading"
            fontWeight={700}
            fontSize={{ xs: 14, md: 20 }}
          >
            {heading}
          </Typography>
          <Typography color={"text.secondary"} fontSize={{ xs: 10, md: 16 }}>
            {subtext}
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            opacity: 0,
            bgcolor: "primary.bglight",
            transition: "opacity 400ms ease",
          }}
        >
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Paper>
  );
}
