import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <Grid
      templateAreas={`"navbar chatpanel"
                  "sidebar chatpanel"
                  `}
      gridTemplateColumns={"400px 1fr"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem px="2" area={"navbar"}>
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"chatpanel"}>
        chatPanel
      </GridItem>
      <GridItem pl="2" bg="red.300" area={"sidebar"}>
        <SideBar />
      </GridItem>
    </Grid>
  );
};

export default Home;
