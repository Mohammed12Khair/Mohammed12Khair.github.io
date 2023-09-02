import React from "react";
import NoteSelect from "./NoteSelect";

const Notes = () => {
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <NoteSelect />
            </div>
            <div className="col-md-6 col-xl-9">
              <div className="form-group mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" />
              </div>
              <div className="field">
                <textarea name="float-textarea textarea-style" placeholder=" "></textarea>
              </div>
              <button className="btn btn-dark btn-sm" type="button">
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notes;
