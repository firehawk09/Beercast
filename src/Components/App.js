import React, {Component} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      brewery: {},
      breweryWeather: {},
      hasGeoError: false,
      latitude: 0,
      longitude: 0,
      modalOpen: false,
      term: '',
      weatherLat: 0,
      weatherlng: 0
    };

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
    console.log(this.state.latitude);
    console.log(this.state.longitude);

    fetch(geoSearchURL)
    .then((results) => {
      if (results.ok) {
        return results.json();
      }
      return Promise.reject(new Error(
        `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
    })
    .then((v) => {
      this.setState({latitude: v.results[0].geometry.location.lat});
      this.setState({longitude: v.results[0].geometry.location.lng});
      this.brewFetch();
      console.log('brewFetch called');
    })
  }

  weatherFetch = (lat, lng) => {
    let weatherURL = [
      'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/forecast',
      '?lat=',
      lat,
      '&lng=',
      lng
    ].join('');

    // console.log(weatherURL);
    // console.log(this.state);
    
    fetch(weatherURL)
      .then((results) => {
        if (results.ok) {
          return results.json();
        }
        return Promise.reject(new Error(
          `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
      })
      .then((v) => {
        // console.log(v);
        this.setState({breweryWeather: v});
        // console.log(this.state);
      })
  }

  brewDetailFetch = (ID, lat, lng) => {
    this.showModal(true);
    // this.setState({weatherLat: lat});
    // this.setState({weatherlng: lng});
    this.weatherFetch(lat, lng);

    let detailURL = [
      'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/brewerydb/details',
      '?id=',
      ID
    ].join('');
    
    fetch(detailURL)
      .then((results) => {
        if (results.ok) {
          return results.json();
        }
        return Promise.reject(new Error(
          `Failed to fetch ${results.url}: ${results.status} ${results.statusText}`));
      })
      .then((v) => {
        this.setState({brewery: v.data});
      })
  }

  showModal = (bool) => {
    // if (this.state.modalOpen) {
    //   this.brewDetailFetch(); 
    // }

    this.setState({modalOpen: bool});
  }

  getCurrentPosition = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 6000
    };

    let success = (position) => {
      this.setState({latitude: position.coords.latitude});
      this.setState({longitude: position.coords.longitude});
      this.brewFetch();
    }

    let error = (err) => {
      this.setState({hasGeoError: true});
      
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  handleTermChange = (e) => {
    this.setState({term: e});
  }

  handleTermSearch = () => {
    this.geoFetch();
  }

  render() {
    return (
      <div id="App">
        <Header 
          term={this.state.term}
          onTermChange={this.handleTermChange}
          onSearch={this.handleTermSearch} />
        <Main
          brewDetailFetch={this.brewDetailFetch}
          breweries={this.state.breweries}
          brewery={this.state.brewery}
          breweryWeather={this.state.breweryWeather}
          hasGeoError={this.state.hasGeoError}
          modalOpen={this.state.modalOpen}
          showModal={this.showModal} />
        <Footer />
      </div>
    );
  }
}
