import React from 'react'
import Mobile from '../components/Mobile'
import Title from '../components/Title'


export default class Login extends React.Component {

  constructor(){
    super()
    this.state = {
      passwordConfirm: "",
      userName: "",
      password: ""
    }
  }

  changeForm = (e) => this.setState({[e.target.name]: e.target.value})

  createUser = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConfirm){
      fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(this.user())
      })
        .then(resp => resp.json())
        .then(data => {
          localStorage.setItem("token", data.jwt)
          localStorage.setItem("user_id", data.user.id)
          localStorage.setItem("user_name", data.user.name)
          this.props.handleLogin(data.user)
        })
    }
    else{
      alert("Password and Password confirmation must be the same")
    }
  }

  logUserIn = (e) => {
      e.preventDefault()
      fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(this.user())
      })
        .then(resp => resp.json())
        .then(data => {
          if(!data["failure"]){
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("user_id", data.user.id)
            localStorage.setItem("user_name", data.user.name)
            this.props.handleLogin(data.user)
            }else {
              alert("Your information does not match.")
           }
          }
        )}

  user = () => {
    return {username: this.state.userName,
            password: this.state.password}
  }

  render(){
    return(
      <div>

          <Title title = "Sign up / Login"/>
          <section className="site-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <h2 className="mb-4">Sign Up To JobBoard</h2>
                  <form onSubmit = {this.createUser} className="p-4 border rounded">

                    <div className="row form-group">
                      <div className="col-md-12 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Username</label>
                        <input onChange = {this.changeForm} name = "userName" type="text" id="fname" className="form-control" placeholder="Name" />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-12 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Password</label>
                        <input onChange = {this.changeForm} name = "password" type="password" id="fname" className="form-control" placeholder="Password" />
                      </div>
                    </div>
                    <div className="row form-group mb-4">
                      <div className="col-md-12 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Re-Type Password</label>
                        <input onChange = {this.changeForm}  name = "passwordConfirm" type="password" id="fname" className="form-control" placeholder="Re-type Password"/>
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <input type="submit" value="Sign Up" className="btn px-4 btn-primary text-white" />
                      </div>
                    </div>

                  </form>
                </div>
                <div className="col-lg-6">
                  <h2 className="mb-4">Log In To JobBoard</h2>
                  <form action="#" className="p-4 border rounded">

                    <div className="row form-group">
                      <div className="col-md-12 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Username</label>
                        <input onChange = {this.changeForm} name = "userName" type="text" id="fname" className="form-control" placeholder="Name" />
                      </div>
                    </div>
                    <div className="row form-group mb-4">
                      <div className="col-md-12 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Password</label>
                        <input onChange = {this.changeForm} name = "password" type="password" id="fname" className="form-control" placeholder="Password" />
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <input type="submit" value="Log In" className="btn px-4 btn-primary text-white" onClick={this.logUserIn}/>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </section>
      </div>
    )
  }
}