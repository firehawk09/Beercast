import React from 'react';

const BreweryDetail = (props) => {
  let className = 'modal';
  
  if (props.modalOpen) {
    className += ' open';
  } else {
    className = 'modal'
  }

  return (
    <div id="DetailModal" className={className}>
      <div className="modal-content">
        <h4>{props.brewery.name}</h4>
        <p>
          More info coming soon
          <br />
          This part still under construction.
        </p>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={() => props.showModal(false)} className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
  )
}

export default BreweryDetail;