import React from 'react'
import Mobile from '../components/Mobile'
import Title from '../components/Title'
import Counters from '../components/Counters'

export default class About extends React.Component {

  constructor(){
    super()
    this.state ={
      title: "This is counters of our success:",
      description: "Here is some real time data from our application. Look and be jealous!",
      counters: [
        {name: "Users registered", value: 0},
        {name: "Job Postings saved", value: 0},
        {name: "Tasks assigned", value: 0},
        {name: "Notes Created", value: 0}
      ]
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/stats")
      .then(resp => resp.json())
      .then(counters => this.setState({counters}))
  }






 

  

  render(){
    return(
      <div>
         <Title title = "About Us" />
         <Counters 
          // counters = {[
          //   {name: "Users registered", value: this.state.counters[0].value},
          //   {name: "Notes", value: this.state.counters[1].value},
          //   {name: "Companies", value: this.state.counters[2].value},
          //   {name: "Tasks", value: this.state.counters[3].value}
          // ]}
          title= {this.state.title}
          description= {this.state.description}
         />
            
          <section className="site-section pb-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <a data-fancybox data-ratio="2" href="https://vimeo.com/317571768" className="block__96788">
                    <span className="play-icon"><span className="icon-play"></span></span>
                    <img src="images/sq_img_6.jpg" alt="Image" className="img-fluid img-shadow"/>
                  </a>
                </div>
                <div className="col-lg-5 ml-auto">
                  <h2 className="section-title mb-3">Atomic Job For Freelancers, Web Developers</h2>
                  <p className="lead">Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor, sed facere corporis qui, ea quisquam quis odit minus nulla vitae. Sit, voluptatem.</p>
                  <p>Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="site-section pt-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0 order-md-2">
                  <a data-fancybox data-ratio="2" href="https://vimeo.com/317571768" className="block__96788">
                    <span className="play-icon"><span className="icon-play"></span></span>
                    <img src="images/sq_img_8.jpg" alt="Image" className="img-fluid img-shadow"/>
                  </a>
                </div>
                <div className="col-lg-5 mr-auto order-md-1  mb-5 mb-lg-0">
                  <h2 className="section-title mb-3">Atomic Job For Workers</h2>
                  <p className="lead">Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor, sed facere corporis qui, ea quisquam quis odit minus nulla vitae. Sit, voluptatem.</p>
                  <p>Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit!</p>
                </div>
              </div>
            </div>
          </section>

   
          <section className="site-section">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 text-center" data-aos="fade">
                  <h2 className="section-title mb-3">Our Team</h2>
                </div>
              </div>

              <div className="row align-items-center block__69944">

                <div className="col-md-6 order-md-2 ml-md-auto">
                  <img src="images/person_1.jpg" alt="Image" className="img-fluid mb-4 rounded"/>
                </div>

                <div className="col-md-6 order-md-2 ml-md-auto">
                  <h3>Anam Soomro</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel  ad explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.</p>
                  <div className="social mt-4">
                    <a href="#"><span className="icon-facebook"></span></a>
                    <a href="#"><span className="icon-twitter"></span></a>
                    <a href="#"><span className="icon-instagram"></span></a>
                    <a href="#"><span className="icon-linkedin"></span></a>
                  </div>
                </div>

                <div className="col-md-6">
                  <img src="images/person_5.jpg" alt="Image" className="img-fluid mb-4 rounded"/>
                </div>

                <div className="col-md-6">
                  <h3>Paul Hoffart</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel  ad explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.</p>
                  <div className="social mt-4">
                    <a href="#"><span className="icon-facebook"></span></a>
                    <a href="#"><span className="icon-twitter"></span></a>
                    <a href="#"><span className="icon-instagram"></span></a>
                    <a href="#"><span className="icon-linkedin"></span></a>
                  </div>
                </div>

                <div className="col-md-6 order-md-2 ml-md-auto">
                  <img src="images/person_4.jpg" alt="Image" className="img-fluid mb-4 rounded"/>
                </div>

                <div className="col-md-6 order-md-2 ml-md-auto">
                  <h3>Georgii Gavrilchik</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel  ad explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.</p>
                  <div className="social mt-4">
                    <a href="#"><span className="icon-facebook"></span></a>
                    <a href="#"><span className="icon-twitter"></span></a>
                    <a href="#"><span className="icon-instagram"></span></a>
                    <a href="#"><span className="icon-linkedin"></span></a>
                  </div>
                </div>

              </div>
            </div>
          </section>
      </div>
    )
  }
}

