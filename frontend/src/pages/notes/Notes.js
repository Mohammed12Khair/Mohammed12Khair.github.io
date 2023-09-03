import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//To load side list before router render to the UI
import { useLoaderData } from "react-router-dom";
//To refresh the list loaded after change is done
import { useRevalidator } from "react-router-dom";

//Use context of user
import { UserContext } from "../context/UserContext";

const Notes = () => {
  //User details
  const { user, SetUser } = useContext(UserContext);
  const { token, Settoken } = useContext(UserContext);
  

  const NotesData = useLoaderData();
  const revalidator = useRevalidator();

  //Text aread and title state
  const [title, Settitle] = useState("");
  const [content, Setcontent] = useState("");

  let note_new = async () => {
    let data = {
      title: title,
      content: content,
    };
    const res = await axios({
      url: `/notes/new`,
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 1eaabdcf7bffb06c9fedcebc61a83c52e5ed6a514b5ca364bb2a623ae024d559",
      },
    }).then(function (response) {
      Settitle(response.data.title);
      Setcontent(response.data.content);
      revalidator.revalidate();
    });
  };
  let note_detail = async (id) => {
    const res = await axios({
      url: `/api/notes/${id}`,
      method: "GET",
      headers: {
        Authorization: "Token 1eaabdcf7bffb06c9fedcebc61a83c52e5ed6a514b5ca364bb2a623ae024d559",
      },
    }).then(function (response) {
      Settitle(response.data.title);
      Setcontent(response.data.content);
    });
  };
  let note_update = () => {};
  let note_delete = () => {};

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div>
                <h1>
                  Notes
                  <button onClick={note_new} className="btn btn-info btn-sm" type="button">
                    Add new
                  </button>
                </h1>
                <div className="row">
                  <div className="col">
                    <div className="list-group">
                      {NotesData.map((row) => (
                        <a
                          key={row.id}
                          onClick={() => {
                            note_detail(row.id);
                          }}
                          className="list-group-item list-group-item-action"
                          href="#list-home"
                          data-bs-toggle="list"
                        >
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
                <input
                  onChange={(e) => {
                    Settitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  value={title}
                />
              </div>
              <div className="field">
                <textarea
                  onChange={(e) => {
                    Setcontent(e.target.value);
                  }}
                  name="float-textarea textarea-style"
                  placeholder=" "
                  value={content}
                ></textarea>
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
