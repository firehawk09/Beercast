import React, {Component} from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    
    this.props.onSearch();
  }

  handleChange(e) {
    this.props.onTermChange(e.target.value);
  }
  
  render() {
    return(
      <header>
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Logo
            </a>
            <a href="#!!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
            <ul className="sidenav">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
          </div>
          <div className="nav-content">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <input id="nav-search"
                  type="search"
                  value={this.props.term}
                  onChange={this.handleChange}  />
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </header>
    )
  }
}