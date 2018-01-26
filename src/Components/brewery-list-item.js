import React from 'react';

const BreweryList = (brewery) => {
  
  return (
    <li className="collection-item avatar">
      { brewery.brewery.brewery.images ?
        <img src={brewery.brewery.brewery.images.icon} alt="" className="circle" />
        :
        <i className="material-icons circle">folder</i>
      }
      <span className="title">{brewery.brewery.brewery.name}</span>
      <div>
        { brewery.phone ?
          ( brewery.phone.length >= 10 ?
            <div><a href="tel:{brewery.phone}">{brewery.phone}</a></div>
            :
            <div>No Phone listed</div>
          )
          :
          <div>No Phone listed</div>
        }
        { brewery.streetAddress ?
          <div>{brewery.streetAddress}</div>
          :
          <div>No Street Address Listed</div>
        }
        { brewery.brewery.brewery.website ?
          <a href={brewery.brewery.brewery.website} className="">{brewery.brewery.brewery.website}</a>
          :
          <br />
        }
      </div>
      <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
    </li>
    // <li className="collection-item avatar">
    //   <i className="material-icons circle">folder</i>
    //   <span className="title">Title</span>
    //   <p>
    //     First Line
    //     <br />
    //     Second Line
    //   </p>
    //   <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
    // </li>
  );
};

export default BreweryList;
