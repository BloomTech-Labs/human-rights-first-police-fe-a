import React from 'react';

function AdminTable() {
  //This is the current surrounding "table" for admin dashboard. Refer to AntTable to update new table for best look

  return (
    <div>
      <div className="column-headers">
        <input className="hidden-input" type="checkbox" />
        <div className="column-headers-flex">
          <h4 className="description">Description</h4>
          <h4 className="location">Location</h4>
          <h4 className="date">Date</h4>
          <h4 className="edit">Edit</h4>
          {/* placeholder below for accuracy estimate
        <h4>Estimated Accuracy</h4> */}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

export default AdminTable;
