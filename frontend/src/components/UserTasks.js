import React from "react"
import TasksBox from "./TasksBox"

export default class UserTasks extends React.Component {

  constructor(){
    super()
    this.state = {
      tasks: [],
      displayTasks: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.user.id}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}` 
      }
    })
    .then(resp => resp.json())
    .then(tasksList => {
      this.setState({
        tasks: tasksList,
        displayTasks: tasksList
      })
    })
  }

  editTask = (task) => {
    fetch(`http://localhost:3000/user_tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }, 
      body: JSON.stringify(task)
    })
    .then(resp => resp.json())
    .then(updatedTask => {
      let updatedTaskList = this.state.displayTasks.map( task=> 
        task.id === updatedTask.id ? task = updatedTask : task
      )
      this.setState({
        displayTasks: updatedTaskList
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
        user_id: this.props.user.id
      })
    }
    event.target.reset()
    fetch(`http://localhost:3000/user_tasks`, postObj)
    .then(resp => resp.json())
    .then(newTask => {
      this.state.displayTasks.push(newTask)
      this.setState({
        displayTasks: this.state.displayTasks
      })
    })
    } else {
      event.preventDefault()
      // alert("Please enter your task")
      event.target.reset()
    }
  }

  deleteTask = (task) => {
    fetch(`http://localhost:3000/user_tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(reminaingTaskList => {
      this.setState({
        displayTasks: reminaingTaskList,
        tasks: reminaingTaskList
      })
    })
  }

  filterTask = (e) => {
    if(e.target.value === "All"){
      this.setState({displayTasks: this.state.tasks})
    }else if(e.target.value === 'Completed')
      this.setState({displayTasks: this.state.tasks.filter(task => task.closed === true)}) 
    else {
      this.setState({displayTasks: this.state.tasks.filter(task => task.closed === false)}) 
    }
  }


  render(){
    return(
        <div className="container">
          {/* <div className="mt-5 justify-content-center"> */}
          <div className="mt-5">

              <TasksBox 
                page="user"
                tasks={this.state.displayTasks} 
                filterTask={this.filterTask}
                addTask={this.addTask} 
                editTask={this.editTask} 
                deleteTask={this.deleteTask} 
                handleTaskChange={this.handleTaskChange}/>
          </div> 
        </div> 


    )
  }

}



