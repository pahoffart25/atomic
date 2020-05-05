import React from "react"

export default class NoteModalShow extends React.Component {

  constructor(){
    super()
    this.state = {
      display: "block"
    }
  }



  handleClose = () => this.setState({display: "none"})

  bothDelete = () => {
    this.handleClose()
    this.props.deleteNote()
  }

  bothSave = () => {
    this.handleClose()
    this.props.editNote()
  }


  textareaHeigth = () =>  this.props.note?((this.props.note.content.length / 30 + 2) + "em"): "3em"
  

  render(){
    return(
      <div className="modal fade show" style={{display: this.state.display}} id="show-note">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <input type="text" name="title" value={this.props.note.title} onChange={this.props.handleChange}/>
              {/* <button type="button" className="close"  >
                <span onClick = {this.handleClose}>&times;</span>
              </button> */}
            </div>
            <div className="modal-body">
              <textarea className = "big-text-area" style = {{height: this.textareaHeigth()}} name="content" value={this.props.note.content} onChange={this.props.handleChange}/>
            </div>
            <div className="modal-footer">
              <label>Category:</label>
              <select name="category" value={this.props.note.category} onChange={this.props.handleChange}>
                <option value="misc"> Misc </option>
                <option value="event"> Event </option>
                <option value="lead"> Lead </option>
                <option value="company"> Company </option>
                

              </select>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.bothSave} >Save</button>
              <button type="button" className="btn btn-secondary" onClick={this.bothDelete}data-dismiss="modal" >Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}