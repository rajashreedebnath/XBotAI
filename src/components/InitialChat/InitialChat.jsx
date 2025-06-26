import { Box, Grid, Stack, Typography } from "@mui/material";
import icon from "../../assets/bot.png";
import Card from "./Card";

function InitialChat({ generateResponse }) {
  const initialData = [
    {
      heading: "Hi, what is the weather",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is my location",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is the temperature",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, how are you",
      subtext: "Get immediate AI generated response",
    },
  ];

  const renderedItems = initialData.map((item) => {
    return (
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          heading={item.heading}
          subtext={item.subtext}
          generateResponse={generateResponse}
        />
      </Grid>
    );
  });

  return (
    <Stack alignItems={"center"} justifyContent={"flex-end"} spacing={2}>
      <Typography variant="h2" component={"h2"}>
        How Can I Help You Today?
      </Typography>
      <Box
        component={"img"}
        src={icon}
        borderRadius={"50%"}
        height={70}
        width={70}
      ></Box>

      <Grid container spacing={2} padding={2}>
        {renderedItems}
      </Grid>
    </Stack>
  );
}

export default InitialChat;
