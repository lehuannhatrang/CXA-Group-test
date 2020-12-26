import React, { Component } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import AppContext from "../../../appContext";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import {Col, Container, Row, Card, CardBody} from "shards-react";
import MainSidebar from "../MainSidebar/MainSidebar";
import MainNavbar from "..//MainNavbar/MainNavbar";
import MainFooter from "../MainFooter";
import PageTitle from "../../page-title";

class Layout1 extends Component {
  componentWillUnmount() {
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  render() {
    let { settings } = this.props;
    return (
      <AppContext.Consumer>
        {({ routes }) => 
          <Container fluid>
            <Row>
              {/* <MainSidebar/> */}
              <Col
                  className="main-content p-0"
                  // lg={{size: 10, offset: 2}}
                  // md={{size: 9, offset: 3}}
                  // md='12'
                  sm="12"
                  tag="main"
              >
                <MainNavbar breadcrumbs={this.props.breadcrumbs || []}/>
                  <Container fluid className="main-content-container px-4">
                    {/* <PageTitle title={'Group'} subtitle={'Users'} /> */}
                    {/* <Card className='min-height-550 mt-4'>
                      <CardBody> */}
                        {renderRoutes(routes)}
                      {/* </CardBody>
                    </Card> */}
                  </Container>
                <MainFooter/>
              </Col>
            </Row>
          </Container>
        }
      </AppContext.Consumer>
    );
  }
}

Layout1.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {  }
)(Layout1)

