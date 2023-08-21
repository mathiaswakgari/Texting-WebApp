import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Grid
        templateAreas={{
          base: "main",
        }}
        templateColumns={{
          base: "1fr",
        }}
      >
        <GridItem area="main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
