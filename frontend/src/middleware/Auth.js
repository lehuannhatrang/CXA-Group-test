import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.checkJwtAuth();
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    checkJwtAuth = () => {

    };

    render() {
        const {children} = this.props;
        return <Fragment>{children}</Fragment>;
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {}
)(Auth);
