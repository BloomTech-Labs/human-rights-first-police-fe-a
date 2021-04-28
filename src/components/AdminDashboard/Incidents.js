import React from 'react';

import PendingIncident from './PendingIncident';
import AdminTable from './AdminTable';
// import AntTable from './AntTableComponents/AntTable';

const DashboardIncidents = props => {
  const {
    confirmApprove,
    confirmReject,
    confirmApproveHandler,
    confirmRejectHandler,
    approveAndRejectHandler,
    confirmCancel,
    selected,
    selectAll,
    allSelected,
    changeSelected,
    handlePerPageChange,
    currentSet,
    setUnapprovedIncidents,
    setPageNumber,
  } = props;

  return (
    <>
      <div className="dashboard-top-flex">
        <div className="dashboard-top-input">
          <input
            type="checkbox"
            name="select-all"
            onChange={confirmApprove ? () => {} : selectAll}
            checked={allSelected}
          />
          <label id="select-all-label" htmlFor="select-all">
            Select All{' '}
          </label>
        </div>

        <div className="dashboard-top-approve-reject">
          {!confirmApprove && !confirmReject ? (
            <button
              disabled={selected.length < 1}
              onClick={confirmApproveHandler}
              className={
                selected.length > 0 ? 'approve-reject-select' : 'hidden-button'
              }
            >
              Approve
            </button>
          ) : (
            <button
              onClick={approveAndRejectHandler}
              className={
                selected.length > 0 ? 'approve-reject-select' : 'hidden-button'
              }
            >
              Yes
            </button>
          )}
          {!confirmApprove && !confirmReject ? (
            <button
              disabled={selected.length < 1}
              onClick={confirmRejectHandler}
              className={
                selected.length > 0 ? 'approve-reject-select' : 'hidden-button'
              }
            >
              Reject
            </button>
          ) : (
            <button
              onClick={confirmCancel}
              className={
                selected.length > 0 ? 'approve-reject-select' : 'hidden-button'
              }
            >
              No
            </button>
          )}
          <p
            className={
              !confirmApprove && !confirmReject
                ? 'confirmation-message transparent'
                : 'confirmation-message'
            }
          >
            Are you sure?
          </p>
        </div>
        <div className="dashboard-top-page-number">
          <label id="items-per-page" htmlFor="per-page-selector">
            Items Per Page
          </label>
          <select
            className="items-pp-select"
            name="per-page-selector"
            onChange={handlePerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <AdminTable />

      <div className="incidents">
        {currentSet.map(incident => {
          return (
            <PendingIncident
              confirmApprove={confirmApprove}
              key={incident.id}
              incident={incident}
              selected={selected}
              changeSelected={changeSelected}
              setUnapprovedIncidents={setUnapprovedIncidents}
              setPageNumber={setPageNumber}
            />
          );
        })}
      </div>

      {/* <AntTable /> */}
    </>
  );
};

export default DashboardIncidents;
