import React, {Component} from 'react';
import BreweryList from './BreweryList';
import BreweryDetail from './BreweryDetail';

export default class Main extends Component {
  render() {
    // console.log(this.props);
    
    if(this.props.breweries.length === 0) {
      if (this.props.hasGeoError) {
        return(
          <div className="container">
            <div className="row">
              <div className="col s12 m7">
                <div className="card hoverable horizontal">
                  <div className="card-stacked">
                    <div className="card-content">
                      <p className="flow-text">We were unable to use your location to search for breweries nearby. Please use the search feature above or enable location access by following the link below.</p>
                    </div>
                    <div className="card-action">
                      <a href="https://support.google.com/chrome/answer/142065?hl=en">Enable location access</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    return(
      <main>
        <div className="container">
          <BreweryDetail />
          <BreweryList
            breweries={this.props.breweries}
            showModal={this.props.showModal} />
        </div>
      </main>
    )
  }
}