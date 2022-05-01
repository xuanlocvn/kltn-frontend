import React from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';

MissionDetail.propTypes = {};

function MissionDetail() {
  const { missionId } = useParams();
  return <div>MissionDetail {missionId}</div>;
}

export default MissionDetail;
