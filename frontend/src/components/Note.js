import React from 'react'


export default class Note extends React.Component {

  constructor(){
    super()
    this.state = {
      editing: false,
      note: "",
    }
  }

  componentDidMount(){
    this.setState({
      note: this.props.note
    })
  }
  
  handleEdit = () => {
    this.setState({
      editing: true,
    })
  }

  handleChange = (event) => {
    this.setState({
      note: {...this.state.note, content: event.target.value}
    })
  }
  

  handleSubmit = () => {
    this.state.editing = false
    this.props.editNote(this.state.note )
  }

  handleDelete = () => {
    this.props.deleteNote(this.state.note)
  }


  render(){
    return ( 
      <div> 
        {
          !this.state.editing
          ? <li className="d-flex align-items-start mb-2" onClick={this.handleEdit}>
              <span className="icon-stop fill mr-2 "></span>
              <span>{this.props.note.content}</span>
            </li>
          : <li className="d-flex align-items-start mb-2">
              <span className="icon-stop fill mr-2 "></span>
              <span>
                <input type="text" 
                  value={this.state.note.content} 
                  onChange={ (e) => this.handleChange(e)}/>
                <button onClick={this.handleSubmit}><span className="icon-check"></span></button>
                <button onClick={() => this.props.deleteNote(this.props.note)}><span className="icon-trash mr-1"></span></button>
              </span>
            </li>
        }
      </div>
    )
  }

}



