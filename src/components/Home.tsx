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
      gridTemplateColumns={{ base: "200px 1fr", md: "400px 1fr" }}
      fontWeight="bold"
      bg={"blackAlpha.900"}
      height={"100vh"}
      overflowY={"hidden"}
    >
      <GridItem px="1" area={"navbar"}>
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
