import React from 'react';
import BreweryList from './BreweryList';
// import BreweryDetail from './BreweryDetail';

const Main = (props) => {
  return(
    <div className="container">
      <BreweryList breweries={this.props.breweries} />
    </div>
  )
};

export default Main;