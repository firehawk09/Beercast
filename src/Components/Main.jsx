import React from 'react';
import BreweryList from './BreweryList';

const Main = (props) => {
  if(props.breweries.length === 0) {
    if (props.hasGeoError) {
      return(
        <div className="container">
          <div className="row">
            <div className="col s12 m7">
              <div className="card hoverable horizontal">
                {/* <div className="card-image">
                  <img alt="random user error" src="https://lorempixel.com/100/190/nature/6" />
                </div> */}
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
    <div className="container">
      <BreweryList breweries={props.breweries} />
    </div>
  )
}

export default Main;