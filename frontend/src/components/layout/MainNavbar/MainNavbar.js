import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, NavbarBrand, Col } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import BreadCrumb from "../../breadcrum";

const MainNavbar = ({ layout, stickyTop, breadcrumbs }) => {
  const isHeaderNav = true
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container fluid={!isHeaderNav || null} className="p-0">
        <Navbar type="light" className="row align-items-stretch flex-md-nowrap p-0">
          <div className="align-items-center col-3">
            <span style={{color: 'gray', fontSize: 20}}>CXA Test - <text style={{color: 'black'}}>Movie</text><text style={{
              color: 'black',
              backgroundColor: 'orange',
              borderRadius: 5,
              padding: 3,
              boxShadow: "2px 2px 5px gray"
            }}>Hub</text></span>
          </div>
          <div className="col-9">
            <NavbarSearch />
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
