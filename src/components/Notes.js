import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getNotes,editNote  } = context;
  const [note,SetNote]=useState({id:"", etitle:"" ,edescription:"", etag: "default"})
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes(SetNote)
    }
    else{
      history("/login")
    }
    // eslint-disable-next-line
  }, [])
  const updatenote = (currentNote) => {
    ref.current.click()
    SetNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    
  }
  const ref = useRef(null)
  const handleClick=(e)=>{

    console.log("..... update the note", note)
    editNote(note.id, note.etitle,note.edescription,note.etag)
    e.preventDefault()
    props.showAlert("Update your note", "Success")
}
const onChange=(e)=>{
    SetNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} minLength={5} required onChange={onChange} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" >description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" >tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
