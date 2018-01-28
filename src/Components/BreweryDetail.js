import React from 'react';

const BreweryDetail = (props) => {
  if (props.showModal) {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    ); 
  }
  return null
};

export default BreweryDetail;
