import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"
const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note,updatenote } = props
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted", "Success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}} ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>

        </div>
    )
}

export default NoteItem
