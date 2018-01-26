import React from 'react';
import BreweryList from './BreweryList';

const Main = (props) => {
  return(
    <div className="container">
      <BreweryList breweries={props.breweries} />
    </div>
  )
}

export default Main;