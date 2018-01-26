import React from 'react';

const BreweryDetail = ({brewery}) => {
  if (!brewery) {
    return <div>Loading Brewery Details...</div>;
  }

  // const breweryId = brewery.id.breweryId;
  // const url = `https://www.youtube.com/embed/${breweryId}`;

  return (
    <div>
    </div>
  );
};

export default BreweryDetail;
