import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note,SetNote]=useState({title:"" ,description:"", tag: "default"})
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        SetNote({title:"" ,description:"", tag: "default"})
        props.showAlert("Added note successfully","success")
    }
    const onChange=(e)=>{
        SetNote({...note,[e.target.name]:e.target.value})
    }
  return (

    <div className='container my-3'>
            <h3>Add a Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >description</label>
                    <input type="text" className="form-control" id="description" name="description"  value={note.description}onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            
        </div>
  )
}

export default AddNote
