import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext, useState, useRef, useEffect } from "react";
import data from "../../aiData/sampleData.json";
import { Stack } from "@mui/material";
import InitialChat from "../../components/InitialChat/InitialChat";
import { ThemeContext } from "../../theme/ThemeContext";
import ChattingCard from "../../components/ChattingCard/ChattingCard";
import ChatInput from "../../components/ChatInput/ChatInput";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";

function Home() {
  const { chat, setChat } = useOutletContext();
  const [chatId, setChatId] = useState(1);
  const [mode, setMode] = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const listRef = useRef(null);

  const generateResponse = (input) => {
    const questionObj = data.find(
      (item) => input.toLowerCase() === item.question.toLowerCase()
    );

    let answer = "Sorry, Did not understand your query!";

    if (questionObj != undefined) {
      answer = questionObj.response;
    }

    setChat((prev) => [
      ...prev,
      {
        type: "Human",
        text: input,
        time: new Date(),
        id: chatId,
      },
      {
        type: "AI",
        text: answer,
        time: new Date(),
        id: chatId + 1,
      },
    ]);

    setChatId((prev) => prev + 2);
  };

  const renderedChat = chat.map((item, index) => {
    return (
      <ChattingCard
        details={item}
        key={index}
        setChat={setChat}
        setSelectedChatId={setSelectedChatId}
        showFeedbackModal={() => setShowModal(true)}
      />
    );
  });

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [scrollToBottom]);

  const displayCard = () => {
    if (chat.length === 0) {
      return <InitialChat generateResponse={generateResponse} />;
    }
    return (
      <Stack spacing={2} margin={2} ref={listRef}>
        {renderedChat}
      </Stack>
    );
  };

  return (
    <Stack
      height={"100vh"}
      justifyContent={"space-between"}
      sx={{
        "@media (max-width:767px)": {
          background:
            mode == "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
        },
      }}
    >
      <Navbar />

      {displayCard()}

      <ChatInput
        chat={chat}
        generateResponse={generateResponse}
        clearChat={() => setChat([])}
        setScroll={setScrollToBottom}
      />

      <FeedbackModal
        open={showModal}
        onClose={() => setShowModal(false)}
        chatId={selectedChatId}
        updateChat={setChat}
      />
    </Stack>
  );
}
export default Home;
