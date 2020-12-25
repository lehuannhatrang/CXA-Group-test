import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Breadcrumb as ShardBreadcrumb, BreadcrumbItem} from 'shards-react';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ShardBreadcrumb>
                {this.props.breadcrumbs.map((item, idx) => {
                    if (item.link) {
                        return (
                            <BreadcrumbItem key={idx}>
                                <Link to={item.linkTo} onClick={() => () => this.props.onClick(item, idx)}>{item.text}</Link>
                            </BreadcrumbItem>
                        )
                    } else {
                        return <BreadcrumbItem key={idx} active>{item.text}</BreadcrumbItem>
                    }
                })}
            </ShardBreadcrumb>
        )
    }

}

Breadcrumb.propTypes = {
    actionConfigs: PropTypes.array,
    breadcrumbs: PropTypes.array,
}

Breadcrumb.defaultProps = {
    actionConfigs: [],
    breadcrumbs: [],
}

export default Breadcrumb;