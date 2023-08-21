import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <Grid
      templateAreas={{
        base: "main",
      }}
      templateColumns={{
        base: "1fr",
      }}
    >
      <GridItem area="main">
        <Login />
      </GridItem>
    </Grid>
  );
}

export default App;
