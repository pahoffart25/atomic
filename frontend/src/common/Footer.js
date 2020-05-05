import React from 'react'

export default class Footer extends React.Component{

  render(){
    return(

      <footer className="site-footer">

        {/* <a href="#top" className="smoothscroll scroll-top">
          <span className="icon-keyboard_arrow_up"></span>
        </a> */}
        <div className="container" >
          {/* <div className="row mb-5" >
            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Contact Us</h3>
              <div className="footer-social">
                <a href="facebook.com"><span className="icon-facebook"></span></a>
                <a href="twitter.com"><span className="icon-twitter"></span></a>
                <a href="instagram.com"><span className="icon-instagram"></span></a>
                <a href="linkedin.com"><span className="icon-linkedin"></span></a>
              </div>
            </div>
          </div> */}
          <div className="row text-center">
            <div className="col-12">
              <p className="copyright"><small>
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              </small></p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}