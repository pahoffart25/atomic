import React from "react"
import NotesBox from "../components/NotesBox"
import TasksBox from "../components/TasksBox"

export default class JobModalShow extends React.Component {

  constructor(){
    super()
    this.state = {
      job: {
        title: "",
        company: "",
        status: "",
        interview: "",
        dateApplied: "",
      },
      notes: null, 
      tasks: null,
      editing: false
    }
  }

  componentDidUpdate(){
    let isAJob = this.props.job 
    let isFirstJob = this.state.job.id ? false : true
    let isADiffJob = isAJob ? (this.props.job.id !== this.state.job.id) : false

    const fetchJobData = () => {
      fetch(`http://localhost:3000/jobs/${this.props.job.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}` 
        }
      })
      .then(resp => resp.json())
      .then(jobData => {
        this.setState({
          job: this.props.job,
          notes: jobData.notes,
          tasks: jobData.tasks
        })
      })
    }

    if(isAJob && isFirstJob){
      fetchJobData()
    } else if (isAJob && isADiffJob){
      fetchJobData()
    }
   
  }

  // FUNCTION REGARDING JOBS

  handleEdit = () => {
    this.setState({
      editing: true
    })
  }

  handleChange = (event) => {
    this.setState({
      job: {...this.state.job, [event.target.name]: event.target.value}
    })
  }

  handleSubmit = () => {
    this.props.editJob(this.state.job)
    this.setState({
      editing: false
    } )
 
  }


  handleDelete = () => {
    this.props.deleteJob(this.state.job)
  }

  // FUNCTIONS REGARDING NOTES

  editNote = (note) => {
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
      let updatedNoteList = this.state.notes.map(note=>
        note.id === updatedNote.id ? note = updatedNote : note 
      )
      this.setState({
        notes: updatedNoteList
      })
    })
  }


  addNote = (event, note) => {
    const trimmed = event.target[0].value.trim().length
    if (trimmed !== 0) {
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
    }else{
      event.preventDefault()
      alert('Please enter your note')
      event.target.reset()
    }
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

  // FUNCTIONS REGARDING TASKS

  editTask = (task) => {
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
      let updatedTaskList = this.state.tasks.map( task=> 
        task.id === updatedTask.id ? task = updatedTask : task
      )
      this.setState({
        tasks: updatedTaskList
      })
    })
  }

  addTask = (event, task) => {
    const trimmed = event.target[0].value.trim().length
    if (trimmed !== 0) {
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
    }else {
      event.preventDefault()
      alert('Please enter your task')
      event.target.reset()
    }
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



  render(){
    return(
      <div className="modal fade" id="show-job" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">

              {this.state.editing
                ? (<header className="text-justify">
                    <h2> <input type="text" name="title" value={this.state.job.title} placeholder="enter job title..." onChange={this.handleChange}/> </h2>
                    <h4> <input type="text" name="company" value={this.state.job.company} placeholder="enter copmany..." onChange={this.handleChange}/> </h4>
                    <h6> <input type="text" name="location" value={this.state.job.location} placeholder="enter location..." onChange={this.handleChange}/> </h6>
                    <h6> <input type="text" name="url" value={this.state.job.url} placeholder="enter url..." onChange={this.handleChange}/> </h6>
                    <h6 onClick={this.handleSubmit}> <span className="icon-check"></span>  </h6>
                  </header>)
                : (<header className="text-justify">
                    <a href={this.state.job.url} target="_blank"> 
                      <h2> {this.state.job.title} </h2> 
                    </a>
                    <h4> {this.state.job.company} </h4>
                    <h6> {this.state.job.location} </h6>
                    <h6 onClick={this.handleEdit}> <span className="icon-pencil"></span> </h6>
                  </header>)
              }

              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div className="modal-body">

              <div className="input-group mb-3" >
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                </div>
                <select className="custom-select" name="status" id="inputGroupSelect01" value={this.state.job.status} onChange={this.handleChange}>
                  <option name="status" value="open">Open</option>
                  <option name="status" value="in-process">In Process</option>
                  <option name="status" value="closed">Closed</option>
                </select>
              </div>

              {
                this.state.job.status !== "open"
                ? <div className="input-group mb-3" >
                    <label className="sr-only" htmlFor="inlineFormInputGroup"></label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" >Date Applied</div>
                      </div>
                      <input type="date" className="form-control" id="inlineFormInputGroup" name="dateApplied" value={this.state.job.date_applied} onChange={this.handleChange}/>
                    </div>
                  </div>
                : null
              }
              <div>
                {
                  this.state.tasks 
                  ? <TasksBox 
                      tasks={this.state.tasks} 
                      filterTask={this.filterTask}
                      addTask={this.addTask} 
                      editTask={this.editTask} 
                      deleteTask={this.deleteTask} 
                      handleTaskChange={this.handleTaskChange}/>
                  : null
                }
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
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Save</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}