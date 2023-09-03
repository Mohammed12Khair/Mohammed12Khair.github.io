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
  //Events just for test
  const [events, Setevents] = useState([]);

  //Selected Note ID
  const [NoteID, setNoteID] = useState(null);

  //User details
  const { user, SetUser } = useContext(UserContext);
  const { token, Settoken } = useContext(UserContext);

  const [NotesData, setNotesData] = useState([]);
  const revalidator = useRevalidator();

  //Text aread and title state
  const [title, Settitle] = useState("");
  const [content, Setcontent] = useState("");

  let loadNotes = async () => {
    const res = await axios({
      url: "/notes",
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        console.log(response.data)
        setNotesData(response.data);
      })
      .catch(function (error) {
        alert("somthing went wrong !");
      });
  };

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
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      Settitle("");
      Setcontent("");
      Setevents([...events, `Success Add new ${title}`]);
      revalidator.revalidate();
    });
  };

  let note_detail = async (id) => {
    console.log(token);
    const res = await axios({
      url: `/notes/${id}`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      setNoteID(id);
      Settitle(response.data.title);
      Setcontent(response.data.content);
      Setevents([...events, `Success Show detail ${response.data.title}`]);
    });
  };

  let note_update = async () => {
    let data = {
      title: title,
      content: content,
    };
    const res = await axios({
      url: `/notes/${NoteID}/edit`,
      method: "PUT",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      Settitle(response.data.title);
      Setcontent(response.data.content);
      Setevents([...events, `Success Updated detail ${response.data.title}`]);
      revalidator.revalidate();
    });
  };

  let note_delete = async () => {
    const res = await axios({
      url: `/notes/${NoteID}/delete`,
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      Settitle("");
      Setcontent("");
      Setevents([...events, `Success Deleted ${title}`]);
      setNoteID(null)
      revalidator.revalidate();
      // setNoteID(null)
    });
  };

  useEffect(
    function () {
      loadNotes();
    },
    [events]
  );

  return (
    <div>
    
      <section className="py-5">
    
        <div className="container">
        <strong>{user ? user.username : ""}</strong>
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div>
                <h1>
                  Notes{" "}
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    onClick={() => {
                      setNoteID(null);
                      Settitle("");
                      Setcontent("");
                    }}
                  >
                    Create New
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
            <div className="col-md-3 col-xl-6">
              <div className="form-group mb-3">
                <label className="form-label">Title</label>
                <input
                  required
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
                  required
                  onChange={(e) => {
                    Setcontent(e.target.value);
                  }}
                  name="float-textarea textarea-style"
                  placeholder=" "
                  value={content}
                ></textarea>
              </div>

              {NoteID ? (
                <div>
                  <button className="btn btn-dark btn-sm" type="button" onClick={note_update}>
                    Save
                  </button>
                  <button onClick={note_delete} className="btn btn-danger btn-sm" type="button">
                    Delete
                  </button>
                </div>
              ) : (
                <button onClick={note_new} className="btn btn-info btn-sm" type="button">
                  Add new
                </button>
              )}
            </div>
            <div className="col-md-1 col-xl-3">
              <div className="form-group mb-3">
                <label className="form-label">Events</label>
                {events.map((item) => (
                  <p key={item.index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notes;
