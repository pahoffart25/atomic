import React from 'react'
import Note from './Note'

export default class NotesBox extends React.Component {

  render(){
    return(
        <div className="mb-5">
        <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-note mr-3"></span>Notes</h3>
        <ul className="list-unstyled m-0 p-0">
          {this.props.notes.map (note => 
            <Note 
              key={note.id} 
              note={note} 
              editNote={this.props.editNote} 
              deleteNote={this.props.deleteNote}/>)}
          <li className="d-flex align-items-start mb-2">
            <span>
              <form onSubmit={(e)=> this.props.addNote(e, this.props.note)} >
                <input type="text" placeholder="new note"/>
                <button type="submit" className= "btn btn-primary">Add</button>
              </form>
            </span>
          </li>

        </ul>
        </div>

    )
  }

}

