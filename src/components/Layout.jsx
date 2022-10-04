import { Fragment } from "react";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <Fragment>
      <Box position="relative">
        <Navbar />
      </Box>
      <main style={{'marginTop':'64px'}}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
