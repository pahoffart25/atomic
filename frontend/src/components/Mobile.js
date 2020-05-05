import React from 'react'

export default class Mobile extends React.Component{

  render(){
    return(
      <section className="pt-5 bg-image overlay-primary fixed overlay" style={{"background-image": "url('images/hero_1.jpg')"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
              <h2 className="text-white">{this.props.title}</h2>
              <p className="mb-5 lead text-white">{this.props.description}</p>
              <p className="mb-0">
                <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-apple mr-3"></span>App Store</a>
                <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-android mr-3"></span>Play Store</a>
              </p>
            </div>
            <div className="col-md-6 ml-auto align-self-end">
              <img src="/images/apps.png" alt="Free Website Template by Free-Template.co" className="img-fluid"></img>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Mobile.defaultProps = {
  title: "This is title form default props",
  description: "You can get mobile aps as soon as we develop them. For now we can use this as the template with 2 buttons"

}