import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { AuthContext } from "./context/AuthContext";

function App() {
  const currentuser = useContext(AuthContext);

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
        <GridItem area="main" w={"100vw"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
