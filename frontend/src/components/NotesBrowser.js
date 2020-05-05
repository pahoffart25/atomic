import React from 'react'
import NoteModalShow from "./NoteModalShow"
import NoteModalCreate from "./NoteModalCreate"

export default class NotesBrowser extends React.Component{

  constructor(){
    super()
    this.state = {
      notes: [],
      notesDisplay: [],
      showNote: null,
      filter: null 
    } 
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.user.id}/notes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
    })
    .then(resp=>resp.json())
    .then(notesData => {
      this.setState({
        notes: notesData,
        notesDisplay: notesData,
        showNote: null 
      })
    })
  }

  setFilter = (event) => {
    let filter = event.target.dataset.filter
    let filteredNotes
    filter === "*"
    ? filteredNotes = this.state.notes 
    : filteredNotes = this.state.notes.filter(note => note.category === filter)
    this.setState({
      filter: event.target.dataset.filter,
      notesDisplay: filteredNotes
    })
  }

  shortTheNote = (content) =>{
    if (content.length < 300){
      return content
    }
    else {
      let shortValue = content.substring(0, content.indexOf(" ", 280))

      if (shortValue.charAt(shortValue.length -1) === ",") {
        shortValue = shortValue.substring(0, shortValue.length -2)
      }
      return shortValue + "..."
    }
  }

  showNoteCard = (note) => {
    let icon= ''
    switch(note.category){
      case 'event':
        icon = "icon-calendar d-block"
        break;
      case 'lead':
        icon = "icon-exclamation-triangle d-block"
        break;
      case 'company':
        icon = "icon-briefcase d-block"
        break;
      case 'misc':
          icon = "icon-question d-block"
    }
      
      return(
      <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5" key={note.id} data-toggle="modal" data-target="#show-note" data-category={note.category} onClick={() => this.setShowNote(note)}>
        <div  className="block__16443 text-center d-block">
          <span className="custom-icon mx-auto"><span className= {`${icon}`} ></span></span>
          <h3>{note.title}</h3>
          <div className="mess">
            <span>{this.shortTheNote(note.content)}</span>
          </div>
          {/* <p className="note-text">{note.content}</p> */}
        </div>
      </div>
      )
  }

  setShowNote = (note) => {
    // not sure you why you have to double click on card the first time load page 
    this.setState({
      showNote: note
    })

  }

  newNote = (note) => {
    fetch("http://localhost:3000/user_notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        category: note.category, 
        user_id: this.props.user.id
      })
    })
    .then(resp => resp.json())
    .then(newNote => {
      this.state.notes.push(newNote)
      this.setState({
        notes: this.state.notes,
        notesDisplay: this.state.notes
      })
    })
  }

  editNote = () => {
    fetch(`http://localhost:3000/user_notes/${this.state.showNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(this.state.showNote)
    })
    .then(resp => resp.json())
    .then(updatedNote => {
      let updatedList = this.state.notes.map( note => 
        note.id === updatedNote.id ?  note = updatedNote : note
      )
      this.setState({
        notes: updatedList,
        notesDisplay: updatedList
      })
    })
  }

  deleteNote = () => {
    fetch(`http://localhost:3000/user_notes/${this.state.showNote.id}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(remainingNotes => {
      debugger
      // or should i have the back end not render anything back
      // just remove element from array 
      this.setState({
        notes: remainingNotes,
        notesDisplay: remainingNotes
      })
    })
  }


  handleChange = (event) => {
    this.setState({showNote: {...this.state.showNote, [event.target.name]: event.target.value}})
  }

  render(){
    return(

      <section className="site-section services-section bg-light block__62849 pt-5" id="next-section">
        <div className="container">

          {/* not sure how to make data-filter work tbh 
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div id="notes" className="filters text-center button-group col-md-7">
              <button className="btn btn-primary" data-filter="*" onClick={this.setFilter}>All</button>
              <button className="btn btn-primary" data-filter="event" onClick={this.setFilter}>Events</button>
              <button className="btn btn-primary" data-filter="lead" onClick={this.setFilter}>Leads</button>
              <button className="btn btn-primary" data-filter="company" onClick={this.setFilter}>Companies</button>
              <button className="btn btn-primary" data-filter="misc" onClick={this.setFilter}>Misc</button>
            </div>
          </div>   */}

          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-primary" data-filter="*" onClick={this.setFilter}>
                <input type="radio" checked/> All
              </label>
              <label className="btn btn-primary" data-filter="event" onClick={this.setFilter}>
                <input type="radio"  /> Events
              </label>
              <label className="btn btn-primary" data-filter="lead" onClick={this.setFilter}>
                <input type="radio"  /> Leads 
              </label>
              <label className="btn btn-primary" data-filter="company" onClick={this.setFilter}>
                <input type="radio" /> Companies
              </label>
              <label className="btn btn-primary" data-filter="misc" onClick={this.setFilter}>
                <input type="radio" /> Misc
              </label>
            </div>
          </div>  



          <div className="row" >
            {/* Create a New Note*/}
            <div  className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5" data-toggle="modal" data-target="#create-note" >
              <div>
                <div href="service-single.html" className="block__16443 text-center d-block">
                  <span className="custom-icon mx-auto"><span className="icon-note d-block"></span></span>
                  <h3>New Note </h3>
                  <p>Add Notes About Events, Leads or Companies</p>
                </div>
              </div>
            </div> 
            {/* Existing Notes */}
            {this.state.notesDisplay.map(note => this.showNoteCard(note))}
          </div>
        </div>
        <NoteModalCreate  newNote={this.newNote}  />
        {
          
          this.state.showNote
          ? <NoteModalShow note={this.state.showNote} handleChange = {this.handleChange} editNote={this.editNote} deleteNote={this.deleteNote}/>
          : null
        }
      </section>
    )
  }
}

