import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { app } from "./services/firebase.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";

const theme = extendTheme({
  fonts: {
    body: "Ubuntu",
    heading: "Ubuntu",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ChatProvider>
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </ChatProvider>
  </AuthProvider>
);
