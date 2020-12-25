import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { connect } from "react-redux";
import { isEqual, merge } from "lodash";
import AppContext from '../../appContext';
import {ShardLayout} from './ShardLayout';

class Layout extends Component {
    constructor(props, context) {
        super(props);
        this.appContext = context;
        this.updateSettingsFromRouter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
        this.updateSettingsFromRouter();
        }
    }

    updateSettingsFromRouter() {
        const { routes } = this.appContext;
        const matched = matchRoutes(routes, this.props.location.pathname)[0];
        let { defaultSettings, settings, setLayoutSettings } = this.props;

        if (matched && matched.route.settings) {
        // ROUTE HAS SETTINGS
        const updatedSettings = merge({}, settings, matched.route.settings);
        if (!isEqual(settings, updatedSettings)) {
            setLayoutSettings(updatedSettings);
            // console.log('Route has settings');
        }
        } else if (!isEqual(settings, defaultSettings)) {
        setLayoutSettings(defaultSettings);
        // console.log('reset settings', defaultSettings);
        }
    }

    render() {
        const { settings } = this.props;
        const CoreLayout = ShardLayout['layout1'];
        return <CoreLayout {...this.props} />;
    }
}

Layout.contextType = AppContext;

const mapStateToProps = state => ({

});

export default withRouter(
    connect(
        mapStateToProps,
        {  }
    )(Layout)
);