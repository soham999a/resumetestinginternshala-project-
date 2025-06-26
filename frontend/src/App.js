import React, { useState } from "react";
import { ChakraProvider, Box, Heading, Container, extendTheme } from "@chakra-ui/react";
import FileUpload from "./components/FileUpload";
import ResumeEditor from "./components/ResumeEditor";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

function App() {
  const [resume, setResume] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bgGradient="linear(to-br, teal.50, blue.50)">
        <Container maxW="lg" py={10}>
          <Heading as="h1" size="2xl" mb={8} textAlign="center" color="teal.600" letterSpacing="tight">
            Resume Editor
          </Heading>
          {!resume ? (
            <FileUpload onParse={setResume} />
          ) : (
            <ResumeEditor resume={resume} setResume={setResume} />
          )}
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 