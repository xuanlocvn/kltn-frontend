/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  isShowed: PropTypes.bool,
};

function Popup(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isShowed, setIsShowed] = useState(false);

  return (
    <>
      {isShowed && (
        <div className="container-fluid pop-up_container">
          <div className="pop-up">
            <div className="pop-up__close">
              <FontAwesomeIcon icon={faXmark} size={'2x'} />
            </div>
            <div className="pop-up__child">{props.children}</div>
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default Popup;
