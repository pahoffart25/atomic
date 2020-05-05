import React from 'react'

export default class Carousel extends React.Component {


  renderElement = (element) => {
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center text-center text-lg-left">
            <blockquote>
              <p>&ldquo;{element.quote}&rdquo;</p>
              <p><cite> &mdash; {`${element.name}, @${element.company}`}</cite></p>
            </blockquote>
          </div>
          <div className="col-lg-6 align-self-end text-center text-lg-right">
            <img src={element.image} alt="Image" className="img-fluid mb-0"></img>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <section className="bg-light pt-5 testimony-full">
        <div className="owl-carousel single-carousel">
          {this.props.elements.map(element => this.renderElement(element))}
        </div>
      </section>
    )
  }
}

Carousel.defaultProps = {
  elements: [
    {
      quote: "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth",
      name: "Steven Nguen",
      company: "Flatiron",
      image: "/images/person_transparent_2.png"
    },
    {
      quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      name: "Raul Sanchez",
      company: "Flatiron",
      image: "/images/person_transparent.png"
    }
  ]
}