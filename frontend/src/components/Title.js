import React from 'react'

export default class Title extends React.Component{

  render(){
    return(
      <section className="section-hero overlay inner-page bg-image" style={{"backgroundImage": "url('images/hero_1.jpg')"}} id="home-section">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-white font-weight-bold">{this.props.title}</h1>
            <div className="custom-breadcrumbs">
              <a href="/">Home</a> <span className="mx-2 slash">/</span>
              <span className="text-white"><strong>{this.props.title}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

Title.defaultProps = {
  title: "This is default props"
}