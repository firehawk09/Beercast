import React from 'react';

const BreweryList = (props) => {
  // console.log(props.brewery.brewery);
  
  return (
    <li className="collection-item avatar">
      {/* { props.brewery.brewery.images.length === 0 ?
        <img src={props.brewery.brewery.images.icon} alt="" className="circle" />
        :
        <i className="material-icons circle">folder</i>
      } */}
      <i className="material-icons circle">folder</i>
      <span className="title">{props.brewery.brewery.name}</span>
      <div>
        { props.brewery.phone ?
          ( props.brewery.phone.length >= 10 ?
            <div><a href="tel:{brewery.phone}">{props.brewery.phone}</a></div>
            :
            <div>No Phone listed</div>
          )
          :
          <div>No Phone listed</div>
        }
        { props.brewery.streetAddress ?
          <div>{props.brewery.streetAddress}</div>
          :
          <div>No Street Address Listed</div>
        }
        { props.brewery.brewery.website ?
          <a href={props.brewery.brewery.website} className="">{props.brewery.brewery.website}</a>
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
