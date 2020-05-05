import React from 'react'




export default class List extends React.Component{

  renderRow = (item) => {
    const briefcase = 
      <svg className="bi bi-briefcase" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-6h-1v6a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-6H0v6z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5v2.384l-7.614 2.03a1.5 1.5 0 01-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 00-.5.5v1.616l6.871 1.832a.5.5 0 00.258 0L15 6.116V4.5a.5.5 0 00-.5-.5h-13zM5 2.5A1.5 1.5 0 016.5 1h3A1.5 1.5 0 0111 2.5V3h-1v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V3H5v-.5z" clipRule="evenodd"/>
      </svg>

    const open = <span className="badge badge-pill badge-danger">Open</span>
    const inProcess = <span className="badge badge-pill badge-success">In Process</span>
    const closed = <span className="badge badge-pill badge-secondary">Closed</span>

    let logo = null 
    if (item.url.includes("monster.com")){
      logo = "https://media.newjobs.com/global/img/jobr/monster-app-logo.png"
    }
    if (item.url.includes("indeed.com")){
      logo = "https://pbs.twimg.com/profile_images/465901126684913664/sTJZxF5G_400x400.jpeg"
    }
    if (item.url.includes("linkedin.com/")){
      logo = "https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo.png"
    }
    if (logo){
      logo = <img className="job-logo" src= {logo} />
    }

    let badge 
    switch (item.status){
      case "open":
        badge = open
        break
      case "in-process":
        badge = inProcess
        break
      case "closed":
        badge = closed
        break
      default:
        badge = open
    }

    return(
      <tr key={item.id} data-toggle="modal" data-target="#show-job" onClick={()=>this.props.handleShowJob(item)}>
        <td>{logo?logo:briefcase}</td>
        <td>{item.company}</td>
        <td>{item.title}</td>
        <td>{item.location}</td>
        <td>{item.dateApplied}</td>
        <td>{badge}</td>
      </tr>
    )
  }

  render(){
    return(
      !!this.props.items
       ? (<section className="site-section pt-0 pb-0 mb-5">

            <div className="container">
              <div className="mb-5 mt-5" >
                <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-eye mr-3"></span>Jobs Tracking</h3>
              </div>
              <div className="md-form mt-0 mb-4">
                <input onChange={this.props.handleSearch} className="form-control" type="text" placeholder="Search" aria-label="Search"/>
              </div>

              {/* <div className="row justify-content-center mb-5" data-aos="fade-up">
                <div id="job-filters" className="filters text-center button-group col-md-7">
                  <button className="btn btn-primary" data-filter="*" onClick={this.props.setFilter} data-toggle="button" aria-pressed="false">All</button>
                  <button className="btn btn-primary" data-filter="open" onClick={this.props.setFilter} data-toggle="button" aria-pressed="false">Open</button>
                  <button className="btn btn-primary" data-filter="in-process" onClick={this.props.setFilter} data-toggle="button" aria-pressed="false">In Process</button>
                  <button className="btn btn-primary" data-filter="closed" onClick={this.props.setFilter} data-toggle="button" aria-pressed="false">Closed</button>
                </div>
              </div>   */}

              <div className="row justify-content-center mb-5" data-aos="fade-up">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-primary active" data-filter="*"onClick={this.props.setFilter}>
                    <input type="radio"   checked/> All
                  </label>
                  <label class="btn btn-primary" data-filter="open" onClick={this.props.setFilter}>
                    <input type="radio"  /> Open
                  </label>
                  <label class="btn btn-primary" data-filter="in-process" onClick={this.props.setFilter}>
                    <input type="radio"  /> In Process
                  </label>
                  
                  <label class="btn btn-primary" data-filter="closed" onClick={this.props.setFilter}>
                    <input type="radio" /> Closed
                  </label>
                </div>
              </div>  

              <table className="table table-hover" width="100%" >
                <thead>
                  <tr>
                    <th className="th-sm"></th>
                    <th className="th-sm" ><i className="fa fa-fw fa-sort" name="company" onClick={this.props.handleSort}></i>Company</th>
                    <th className="th-sm" ><i className="fa fa-fw fa-sort" name="title" onClick={this.props.handleSort}></i>Position</th>
                    <th className="th-sm" ><i className="fa fa-fw fa-sort" name="location" onClick={this.props.handleSort}></i>Location</th>
                    <th className="th-sm" ><i className="fa fa-fw fa-sort" name="dateApplied" onClick={this.props.handleSort}></i>Date Applied</th>
                    <th className="th-sm" ><i className="fa fa-fw fa-sort" name="status" onClick={this.props.handleSort}></i>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map(item => this.renderRow(item))}
                </tbody>
              </table>
            </div>
         </section>)
       : ((<div className="row mb-5 mt-5 justify-content-center">
             <div className="col-md-7 text-center">
               <h2 className="section-title mb-2">You currently are tracking no jobs...</h2>
             </div>
           </div> ) )
   )
  }
}

List.defaultProps = {
  title: "this is title from the default props",
  items: [
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
    {url: "job-single.html",
    logo: "/images/job_logo_1.jpg",
    title: "Product Designer",
    company: "Adidas",
    location: "New York",
    status: "Remote"},
  ]
}