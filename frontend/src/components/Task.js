import React from 'react'


export default class Task extends React.Component {

  constructor(){
    super()
    this.state = {
      editing: false,
      // task: "",
      // closed: ""
      task: {
        item: "",
        closed: ""
      }
    }
  }

  componentDidMount(){
    this.setState({
      task: this.props.task
    })
  }
  
  handleEdit = () => {
    this.setState({
      editing: true,
    })
  }

  handleChange = (event) => {
    this.setState({
      task: {...this.state.task, item: event.target.value}
    })
  }

  handleSubmit = () => {
    this.state.editing = false
    this.props.editTask(this.state.task)
  }

  toggleClosed = () => {
    this.state.task.closed = !this.state.task.closed
    this.props.editTask(this.state.task)
  }
  
  render(){
    return ( 
      <div> 
        {/* <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input type="checkbox" aria-label="checkbox for following text input"/>
            </div>
          </div>
          <input type="text" className="form-control" aria-label="Text input with checkbox"
            value={this.props.task.item} onChange={ (e) => this.props.handleEditChange(e, this.props.task)}
          />
        </div> */}
          {!this.state.editing
          ? 
            <li className="d-flex align-items-start mb-2" >
              {/* <span className="icon-check_circle mr-2 text-muted"></span> */}
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="materialUnchecked" checked={this.state.task.closed} onChange={this.toggleClosed}/>
                {/* <label class="form-check-label" for="materialUnchecked">Material unchecked</label> */}
              </div>
              <span onClick={this.handleEdit} >{this.props.task.item}</span>
            </li>
            
          : <li className="d-flex align-items-start mb-2">
              {/* <span className="icon-check_circle mr-2 text-muted"></span> */}
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                {/* <label class="form-check-label" for="materialUnchecked">Material unchecked</label> */}
              </div>
              <span>
                <input type="text" 
                  value={this.state.task.item} 
                  onChange={this.handleChange}
                  style={{width: "60%"}} />
                <button  onClick={this.handleSubmit}><span className="icon-check"></span></button>
                <button onClick={() => this.props.deleteTask(this.props.task)}><span className="icon-trash mr-1"></span></button>
              </span>
            </li>
          }
      </div>
    )
  }

}

