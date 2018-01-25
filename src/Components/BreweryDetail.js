import React from 'react';

const BreweryDetail = ({brewery}) => {
  if (!brewery) {
    return <div>Loading...</div>;
  }

  // const breweryId = brewery.id.breweryId;
  // const url = `https://www.youtube.com/embed/${breweryId}`;

  return (
    <div className="brewery-detail col-md-8">
      <div className="details">
        <div>{brewery.snippet.title}</div>
        <div>{brewery.snippet.description}</div>
      </div>
    </div>
  );
};

export default BreweryDetail;
