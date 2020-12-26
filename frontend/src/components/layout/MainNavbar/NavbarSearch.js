import React, {Component} from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  handleSubmitSearch(evt) {
    evt.preventDefault();
    if(!!this.state.keyword) {
      this.props.history.push(`/search/${this.state.keyword}`)
    }
  }

  render() {
    return (
      <form className="main-navbar__search w-100 d-flex" ref={ (ref) => { this.formRef = ref }}
      onSubmit={(evt) => this.handleSubmitSearch(evt)}>
        <InputGroup seamless className="ml-md-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder="Search for videos..."
            onChange={(e) => this.setState({keyword: e.target.value})}
          />
          <InputGroupAddon type="append">
            <Link to="#" className="align-self-center" 
            onClick={ () => {this.formRef.dispatchEvent(new Event('submit')) }}>
              <InputGroupText>
                <i className="material-icons text-primary" style={styles.submitIcon}>send</i>
              </InputGroupText>
            </Link>
          </InputGroupAddon>
        </InputGroup>
      </form>
    )
  }
}

const styles = {
  submitIcon: {
    fontSize: 14
  }
}


const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps)(SearchBar));

// export default SearchBar;
