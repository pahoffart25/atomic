import React from 'react'

export default class GreenCrossPiece extends React.Component{


  render(){
    return(
      <section className="py-5 bg-image overlay-primary fixed overlay" style={{"background-image": "url('images/hero_1.jpg')"}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="text-white">{this.props.title}</h2>
              <p className="mb-0 text-white lead">{this.props.description}</p>
            </div>
            <div className="col-md-3 ml-auto">
              <button onClick = {this.props.toggleClick} className="btn btn-warning btn-block btn-lg">{this.props.buttonName}</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

GreenCrossPiece.defaultProps = {
  title: "This is title from defailt props",
  description: "You can use me to interlay two grey components. Just pass the props to GreenCrossPiece.js",
  buttonName: "Press Me",
  toggleClick: () => alert("Function can be provided to the props")
}