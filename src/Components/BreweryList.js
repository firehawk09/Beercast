import React from 'react';
import BreweryListItem from './brewery-list-item';

const BreweryList = (props) => {
  // console.log(props);
  return (
    <ul className="collection">
      {props.breweries.map((brewery, index) => (
        <BreweryListItem brewery={brewery} key={brewery.id} />
    ))}
    </ul>
  );
};

export default BreweryList;
