import React, {Component} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      geoCoords: {
        // lat: 30.1044506,
        // lng: -95.2364276
        lat: 0,
        lng: 0
      },
      term: 'porter'
    };

    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(position.coords.latitude, position.coords.longitude);
    //   let geoCoords;
    //   geoCoords.lat = position.coords.latitude;
    //   geoCoords.lng = position.coords.longitude;
    //   this.setState({geoCoords});
    //   console.log(this.state.geoCoords);
    // });

    let geoSearchURL = [
			'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/google/search',
			'?address=',
			this.state.term
		].join('');

		console.log(geoSearchURL);

    fetch(geoSearchURL)
      .then((results) => {
        if (results.ok) {
          return results.json();
        }
        return Promise.reject(new Error(
          `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
      })
      .then((v) => {
        let coordsLocation = v.results[0].geometry.location;
        console.log(coordsLocation);
        this.setState({geoCoords: coordsLocation});
        console.log(this.state.geoCoords);

        let brewSearchURL = [
          'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/brewerydb/search',
          '?lat=',
          this.state.geoCoords.lat,
          '&lng=',
          this.state.geoCoords.lng,
          '&radius=60'
        ].join('');

        console.log(brewSearchURL);

        fetch(brewSearchURL)
          .then((results) => {
            console.log('Fetching breweries');
            
            if (results.ok) {
              return results.json();
            }
            return Promise.reject(new Error(
              `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
          })
          .then((v) => {
            console.log(v);
            this.setState({breweries: v.data});
            this.setState({totalResults: v.totalResults});
            console.log(this.state.breweries);
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
