import React, {Component} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      geocoords: {
        lat: '',
        lng: ''
      },
      term: 'houston'
    };

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      let geocoords;
      geocoords.lat = position.coords.latitude;
      geocoords.lng = position.coords.longitude;
      this.setState({geocoords});
      console.log(this.state.geocoords);
    });

    let geoSearchURL = [
			'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/google/search',
			'?address=',
			this.state.term
		].join('');

		// console.log(geoSearchURL);

    fetch(geoSearchURL)
      .then((results) => {
        if (results.ok) {
          return results.json();
        }
        return Promise.reject(new Error(
          `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
      })
      .then((v) => {
        let geocoords = {}
        geocoords.lat = v.results[0].geometry.location.lat;
        geocoords.lng = v.results[0].geometry.location.lng;
        this.setState({geocoords});
        
        // console.log(this.state.geocoords);

        let brewSearchURL = [
          'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/brewerydb/search',
          '?lat=',
          this.state.geocoords.lat,
          '&lng=',
          this.state.geocoords.lng,
          '&radius=40 '
        ].join('');

        fetch(brewSearchURL)
          .then((results) => {
            if (results.ok) {
              return results.json();
            }
            return Promise.reject(new Error(
              `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
          })
          .then((v) => {
            // console.log(v);
            this.setState({breweries: v.data});
            this.setState({totalResults: v.totalResults});
            // console.log(this.state.breweries);
            console.log(this.state);
            
          })
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Main breweries={this.state.breweries} />
        <Footer />
      </div>
    );
  }
}
