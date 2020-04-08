import React from 'react';

const Status = props => {

  const {statusName, newCount, totalCount, statusGraph,statusColor } = props;

  return (
    <div>
      <div>
        <div style = {{color:statusColor}}>{statusName}</div>
        <div style = {{color:statusColor}}>{newCount}</div>
        <div style = {{color:statusColor}}>{totalCount}</div>
        <div style = {{color:statusColor}}>{statusGraph}</div>
      </div>
    </div>
  )
}

export default Status;