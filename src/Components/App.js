import React, {Component} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      hasGeoError: false,
      latitude: 0,
      longitude: 0,
      showModal: false,
      term: ''
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

  brewDetailFetch = (bool,breweryID) => {
    console.log(breweryID);
    console.log(this.state);

    let detailURL = [
      'https://pgo0ng10el.execute-api.us-east-1.amazonaws.com/dev/brewerydb/details',
      '?id=',
      breweryID
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
        console.log(this.state);
        
      })
    
    return
    // this.setState({showModal: bool})
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
          breweries={this.state.breweries}
          showModal={this.brewDetailFetch}
          hasGeoError={this.state.hasGeoError} />
        <Footer />
      </div>
    );
  }
}
