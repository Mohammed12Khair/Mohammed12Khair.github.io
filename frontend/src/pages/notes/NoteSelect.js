import React from "react";

const NoteSelect = () => {
  return (
    <div>
      {" "}
      <h1>
        Notes
        <button className="btn btn-info btn-sm" type="button">
          Add new
        </button>
      </h1>
      <div className="row">
        <div className="col">
          <div className="list-group">
            <a className="list-group-item list-group-item-action" href="#list-home" data-bs-toggle="list">
              Home
            </a>
            <a className="list-group-item list-group-item-action" href="#list-profile" data-bs-toggle="list">
              Profile
            </a>
            <a className="list-group-item list-group-item-action" href="#list-messages" data-bs-toggle="list">
              Messages
            </a>
            <a className="list-group-item list-group-item-action" href="#list-settings" data-bs-toggle="list">
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteSelect;
