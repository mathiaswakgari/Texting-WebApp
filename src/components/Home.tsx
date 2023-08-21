import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import ChatPanel from "./ChatPanel";

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
      <GridItem area={"chatpanel"}>
        <ChatPanel />
      </GridItem>
      <GridItem area={"sidebar"}>
        <SideBar />
      </GridItem>
    </Grid>
  );
};

export default Home;
