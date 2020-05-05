import React from 'react'

export default class LogosList extends React.Component{

  renderLogo = (logo, num) => {
    return (
      <div className="col-6 col-lg-3 col-md-6 text-center">
        <img src={logo} alt="Image" className={`img-fluid logo-${num}`}></img>
      </div>
    )
  }

  render(){
    return(
      <section className="site-section py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center mt-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <h2 className="section-title mb-2">{this.props.title}</h2>
                  <p className="lead">{this.props.description}</p>
                </div>
              </div>
            </div>
            {this.props.logos.map((logo, index) => this.renderLogo(logo, index))}
          </div>
        </div>
      </section>
    )
  }

}


LogosList.defaultProps = {
  logos:  ["/images/logo_mailchimp.svg",
    "/images/logo_paypal.svg" ,          
    "/images/logo_stripe.svg" ,
    "/images/logo_visa.svg" ,
    "/images/logo_apple.svg" ,
    "/images/logo_tinder.svg" ,
    "/images/logo_sony.svg" ,
    "/images/logo_airbnb.svg"],
  title: "This is the title from default props",
  description: "You should provide description to props"

}