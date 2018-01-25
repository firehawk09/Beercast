import React, {Component} from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {term: ''};
	}
	
	componentWillMount() {

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      // let geocoords;
      // geocoords.lat = position.coords.latitude;
      // geocoords.lng = position.coords.longitude;
      // this.setState({geocoords});
      // console.log(this.state.geocoords);
		});
	}

	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<form onSubmit={this.getCoords}>
						<div className="input-field">
						<input
						id="search" type="search" placeholder="Search"
						value={this.state.term}
						onChange={event => this.setState({term: event.target.value})} />
						<i className="material-icons">close</i>
						</div>
					</form>
				</div>
			</nav>
		);
	}
}
