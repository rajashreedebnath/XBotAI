import { Stack, Typography } from "@mui/material";

function Card({ heading, subtext, generateResponse }) {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      spacing={2}
      borderRadius={1}
      boxShadow={"0 0 12px rgba(0,0,0,0.1)"}
      bgcolor={"primary.light"}
      sx={{
        "&:hover .MuiIconButton-root": {
          opacity: 1,
        },
        cursor: "pointer",
        "&:hover": {
          bgcolor: "primary.bglight",
        },
        transition: "background 200ms ease",
      }}
      onClick={() => generateResponse(heading)}
    >
      <Typography component="h2" variant="h2" fontSize={{ xs: 14, md: 20 }}>
        {heading}
      </Typography>
      <Typography fontSize={{ xs: 10, md: 16 }}>{subtext}</Typography>
    </Stack>
  );
}

export default Card;
