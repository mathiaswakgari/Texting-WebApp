import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { AuthContext } from "./context/AuthContext";

type Props = {
  children: ReactNode;
};

function App() {
  const currentUser = useContext(AuthContext);

  const ProtectedRoute = ({ children }: Props) => {
    if (!currentUser) return <Navigate to={"/login"} />;
    return children;
  };

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
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
