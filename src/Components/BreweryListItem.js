import React, {Component} from 'react';

export default class BreweryListItem extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  // }
  
  render() {
    return (
      <li className="collection-item avatar">
        { this.props.brewery.brewery.images ?
          <img src={this.props.brewery.brewery.images.icon} alt="icon" className="circle" />
          :
          <i className="material-icons circle">folder</i>
        }
        {/* <i className="material-icons circle">folder</i> */}
        <span className="title">{this.props.brewery.brewery.name}</span>
        <div>
          { this.props.brewery.phone ?
            ( this.props.brewery.phone.length >= 10 ?
              <div><a href="tel:{brewery.phone}">{this.props.brewery.phone}</a></div>
              :
              <div>No Phone listed</div>
            )
            :
            <div>No Phone listed</div>
          }
          { this.props.brewery.streetAddress ?
            <div>{this.props.brewery.streetAddress}</div>
            :
            <div>No Street Address Listed</div>
          }
          { this.props.brewery.brewery.website ?
            <a href={this.props.brewery.brewery.website} className="">{this.props.brewery.brewery.website}</a>
            :
            <br />
          }
        </div>
        <a href="#!" onClick={() => this.props.brewDetailFetch(this.props.brewery.breweryId, this.props.brewery.latitude, this.props.brewery.longitude)} className="secondary-content"><i className="material-icons">send</i></a>
      </li>
    )
  }
};
