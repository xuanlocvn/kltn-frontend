import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

StudentTab.propTypes = {
  onTab: PropTypes.func,
  isOwnStdudent: PropTypes.bool,
};

StudentTab.defaultProps = {
  onTab: null,
  isOwnStdudent: false,
};

function StudentTab(props) {
  const [activeButton, setActiveButton] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { onTab, isOwnStdudent } = props;

  useEffect(() => {
    const tab = searchParams.get('t');
    if (Number(tab) != 0) {
      setActiveButton(Number(tab));
      onTab(Number(tab));
    } else {
      setActiveButton(1);
      onTab(1);
    }
  }, [searchParams]);

  const handleActive = (tabNumber: number) => {
    setActiveButton(tabNumber);
  };

  return (
    <div className="form_tab col col-3">
      {isOwnStdudent ? (
        <>
          <p>
            <button
              className={activeButton == 1 ? 'active' : ''}
              onClick={() => {
                onTab(1);
                handleActive(1);
                setSearchParams({ t: '1' });
              }}
            >
              Thông tin sinh viên
            </button>
          </p>
          <p>
            <button
              className={activeButton == 2 ? 'active' : ''}
              onClick={() => {
                onTab(2);
                handleActive(2);
                setSearchParams({ t: '2' });
              }}
            >
              Tài khoản
            </button>
          </p>
          <p>
            <button
              className={activeButton == 3 ? 'active' : ''}
              onClick={() => {
                onTab(3);
                handleActive(3);
                setSearchParams({ t: '3' });
              }}
            >
              Chứng nhận
            </button>
          </p>
        </>
      ) : (
        <p>
          <button
            className={activeButton == 3 ? 'active' : ''}
            onClick={() => {
              onTab(3);
              handleActive(3);
              setSearchParams({ t: '3' });
            }}
          >
            Chứng nhận
          </button>
        </p>
      )}
    </div>
  );
}

export default StudentTab;
