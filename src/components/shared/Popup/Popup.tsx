import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

Popup.propTypes = {
  children: PropTypes.node.isRequired,
};

function Popup(props) {
  return (
    <div className="container-fluid pop-up_container">
      <div className="pop-up">
        <div className="pop-up__close">
          <FontAwesomeIcon icon={faXmark} size={'2x'} />
        </div>
        <div className="pop-up__child">{props.children}</div>
      </div>
    </div>
  );
}

export default Popup;
