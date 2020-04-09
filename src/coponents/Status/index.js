import React from 'react';

const Status = props => {

  const {statusName, newCount, totalCount, statusGraph,statusColor } = props;

  return (
    <div>
      <div style = {{margin: 20, display: 'flex', flexDirection: 'column', 
          alignItems: 'center'}}>
        <div style = {{color:statusColor, fontSize: 13, 
          fontWeight: 700}}>{statusName}</div>
        <div style = {{color:statusColor}}>{newCount}</div>
        <div style = {{color:statusColor}}>{totalCount}</div>
        <div style = {{color:statusColor}}>{statusGraph}</div>
      </div>
    </div>
  )
}

export default Status;