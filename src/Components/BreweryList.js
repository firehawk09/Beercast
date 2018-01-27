import React from 'react';
import BreweryListItem from './brewery-list-item';

const BreweryList = (props) => {
  if (props.breweries.length >= 1) {
    return (
      <ul className="collection">
        {props.breweries.map((brewery, index) => (
          <BreweryListItem brewery={brewery} key={brewery.id} />
        ))}
      </ul>
    )
  } else {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    )
  }
};

export default BreweryList;
