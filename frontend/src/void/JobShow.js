import React from 'react'
import NotesBox from '../components/NotesBox'
import TasksBox from '../components/TasksBox'


export default class JobShow extends React.Component {

  constructor(){
    super()
    this.state = {
      notes: null,
      tasks: null,
    } 
  }

  // or is it better to fetch all notes and tasks while you fetch all jobs
  componentDidMount(){
    fetch(`http://localhost:3000/jobs/${this.props.job.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}` 
      }
    })
    .then(resp => resp.json())
    .then(jobData => {
      this.setState({
        notes: jobData.notes,
        tasks: jobData.tasks
      })
    })
  }

   handleTaskChange = (event, taskEditing) => {
    let taskList = this.state.tasks
    taskEditing.item = event.target.value
    taskList.map(task => {
      if (task === taskEditing ){
        task.item = taskEditing.item
      }
    })
    this.setState({
      tasks: taskList
    })
  }

  addTask = (event, task) => {
    event.preventDefault()
    let postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        item: event.target[0].value,
        closed: false,
        job_id: this.props.job.id
      })
    }
    event.target.reset()
    fetch(`http://localhost:3000/job_tasks`, postObj)
    .then(resp => resp.json())
    .then(newTask => {
      this.state.tasks.push(newTask)
      this.setState({
        tasks: this.state.tasks
      })
    })
  }

  editTask = (event, task) => {
    // task here will already have updated value bc of onChange updating it
    // or closed being toggle within the Task component 
    fetch(`http://localhost:3000/job_tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }, 
      body: JSON.stringify(task)
    })
    .then(resp => resp.json())
    .then(updatedTask => {
      let taskList = this.state.tasks
      taskList.map(task=>{
        if(task.id === updatedTask.id){
          task = updatedTask
        }
      })
      this.setState({
        tasks: taskList
      })
    })
  }

  deleteTask = (task) => {
    fetch(`http://localhost:3000/job_tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(reminaingTaskList => {
      this.setState({
        tasks: reminaingTaskList
      })
    })
  }


  handleNoteChange = (event, noteEditing) => {
    let noteList = this.state.notes
    noteEditing.content = event.target.value
    noteList.map(note => {
      if (note === noteEditing ){
        note.item = noteEditing.content
      }
    })
    this.setState({
      notes: noteList
    })
  }

  editNote = (event, note) => {
    // note here will already have updated value bc of onChange updating it
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }, 
      body: JSON.stringify(note)
    })
    .then(resp => resp.json())
    .then(updatedNote => {
      let noteList = this.state.notes
      noteList.map(note=>{
        if(note.id === updatedNote.id){
          note = updatedNote
        }
      })
      this.setState({
        notes: noteList
      })
    })
  }

  addNote = (event, note) => {
    event.preventDefault()
    let postObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          content: event.target[0].value,
          job_id: this.props.job.id
        })
    }
    event.target.reset()
    fetch(`http://localhost:3000/notes`, postObj)
    .then(resp => resp.json())
    .then(newNote => {
      this.state.notes.push(newNote)
      this.setState({
        notes: this.state.notes
      })
    })
    
  }

  deleteNote = (note) => {
    fetch(`http://localhost:3000/notes/${note.id}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(remainingNoteList => {
      this.setState({
        notes: remainingNoteList
      })
    })
  }

  changeStatus = (event) => {
    fetch(`http://localhost:3000/jobs/${this.props.job.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ // JSON.stringify(...).then is not a function
        status: event.target.value
      })
      .then(updatedJob => {
        debugger
        // how do i make this component rerender with the new job
        // is this why they tell us to keep one state. idk. 
      })
    })
    
  }
  

  render(){
    const divStyle = {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridColumnGap: "10px",
      marginLeft: "30px"
    }
    return(
      <div> 
        <div className="jumbotron">
        <button onClick={this.props.handleBack}> Go back </button>
          <a href={this.props.job.url} target="_blank">
            <h1> {this.props.job.title} </h1> 
          </a>
          <h2> {this.props.job.company} </h2>
          <h3> {this.props.job.location} </h3>
          <div className="input-group mb-3" style={{width: "20%"}}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" value={this.props.job.status} onChange={this.changeStatus}>
              <option value="apply">Apply</option>
              <option value="follow-up">Follow-Up</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div style={divStyle}>
          {
            this.state.notes 
            ? <NotesBox 
                notes={this.state.notes} 
                editNote={this.editNote}
                addNote={this.addNote} editNote={this.editNote} 
                deleteNote={this.deleteNote}
                handleNoteChange={this.handleNoteChange}/> 

            : null
          }
          {
            this.state.tasks 
            ? <TasksBox 
                tasks={this.state.tasks} 
                addTask={this.addTask} 
                editTask={this.editTask} 
                deleteTask={this.deleteTask} 
                handleTaskChange={this.handleTaskChange}/>
            : null
          }
        </div>
      </div>
    )
  }
}

