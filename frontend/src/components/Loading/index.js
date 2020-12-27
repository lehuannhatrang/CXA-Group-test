import React, {Component} from "react"

class Loading extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`${this.props.className} sk-chasing-dots`} style={{...this.props.style}}>
                <div className="sk-child sk-dot1"></div>
                <div className="sk-child sk-dot2"></div>
            </div>
        )
    }
}
export default Loading;