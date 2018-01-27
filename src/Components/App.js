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
        lat: 0,
        lng: 0
      },
      latitude: 0,
      longitude: 0,
      defaultTerm: 'Houston',
      term: ''
    };

    // this.brewFetch = this.brewFetch.bind(this);
    // this.geoFetch = this.geoFetch.bind(this);
    // this.handleTermChange = this.handleTermChange.bind(this);
    // this.handleTermSearch = this.handleTermSearch.bind(this);

    // this.geoFetch();

    this.getCurrentPosition();
  }
  
  brewFetch = () => {
    let brewSearchURL = [
      'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/brewerydb/search',
      '?lat=',
      this.state.latitude,
      '&lng=',
      this.state.longitude,
      '&radius=60'
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
        this.setState({breweries: v.data});
        this.setState({totalResults: v.totalResults});
      })
  }
  
  geoFetch = () => {
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
      this.setState({geoCoords: coordsLocation});
      this.brewFetch();
    })
  }

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      this.setState({latitude: position.coords.latitude});
      this.setState({longitude: position.coords.longitude});
      this.brewFetch();
    });
  };

  handleTermChange = (e) => {
    this.setState({term: e});
  }

  handleTermSearch = () => {
    this.geoFetch();
  }

  render() {
    return (
      <div>
        <Header 
          term={this.state.term}
          onTermChange={this.handleTermChange}
          onSearch={this.handleTermSearch} />
        <Main 
          breweries={this.state.breweries} />
        <Footer />
      </div>
    );
  }
}
