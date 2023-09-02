import React from "react";
import { useLoaderData } from "react-router-dom";

const Notes = () => {
  const NotesData = useLoaderData();
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div>
                <h1>
                  Notes
                  <button className="btn btn-info btn-sm" type="button">
                    Add new
                  </button>
                </h1>
                <div className="row">
                  <div className="col">
                    <div className="list-group">
                      {NotesData.map((row) => (
                        <a className="list-group-item list-group-item-action" href="#list-home" data-bs-toggle="list">
                          {row.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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

export const loadNotes = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/notes/test");
  return res.json();
};
