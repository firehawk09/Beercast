import React from 'react';

const BreweryDetail = ({brewery}) => {
  if (!brewery) {
    M.toast({html: 'Retrieving Brewery Details'})
    return
  }

  // const breweryId = brewery.id.breweryId;
  // const url = `https://www.youtube.com/embed/${breweryId}`;

  return (
    <div>
    </div>
  );
};

export default BreweryDetail;
