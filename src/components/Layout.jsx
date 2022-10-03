import { Fragment } from 'react'
import Navbar from '../components/Navbar'

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;