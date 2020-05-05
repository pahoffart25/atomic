import React from 'react'
import Task from './Task'


export default class TasksBox extends React.Component {

  render(){
    return(
        <div className="mb-5">
          <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-list task mr-3"></span>Tasks</h3>
          {this.props.page === "user" 
          ? 
          <select className="h5 d-flex align-items-center mb-4 text-primary" onChange={this.props.filterTask}>
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
            </select>
            
            :null
          }
          
          <ul className="list-unstyled m-0 p-0">
            {this.props.tasks.map (task => 
              <Task 
                task={task}
                key={task.id}
                task={task} 
                addTask={this.props.addTask} 
                editTask={this.props.editTask} 
                deleteTask={this.props.deleteTask}
                handleTaskChange={this.props.handleTaskChange}/>)}
            <li className="d-flex align-items-start mb-2">
              <span>
                <form onSubmit={(e)=> this.props.addTask(e, this.props.note)} >
                  <input type="text" placeholder="new task"/>
                  <button type="submit" className= "btn btn-primary">Add</button>
                </form>
              </span>
            </li>
          </ul>
        </div>

    )

  }

}


