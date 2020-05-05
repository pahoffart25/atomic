import React from 'react'
// import JobShow from "../components/JobShow"
// import JobList from "../void/JobList"
import List from '../components/List'
import JobForm from "../components/JobForm"
import JobModalShow from '../components/JobModalShow'

export default class Jobs extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      jobs : null, 
      jobsDisplay: null, 
      user_id: props.user.id,
      showJob: null,
      search: null,
      filter: null,
      sort: null,
      sortAsc: null 
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.state.user_id}/jobs`, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then( jobData => {
      this.setState({
        jobs: jobData,
        jobsDisplay: jobData,
      })
    })
  }
  
  handleShowJob = (job) => {
    this.setState({
      showJob: job
    })
  }

  handleBack = () => {
    this.setState({
      showJob: null
    })
  }


  addJob = (event) => {
    event.preventDefault()
    let postObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: event.target[0].value,
        company: event.target[1].value,
        location: event.target[2].value,
        url: event.target[3].value,
        status: "open",
        interview: "false",
        user_id: this.state.user_id,
        dateApplied: ""
      })
    }
    event.target.reset()
    fetch("http://localhost:3000/jobs", postObject)
    .then(resp => resp.json())
    .then(newJob => {
      this.state.jobs ? this.state.jobs.push(newJob) :  this.state.jobs = [newJob]
      // this.state.jobsDisplay ? this.state.jobsDisplay.push(newJob) :  this.state.jobsDisplay = [newJob]
      this.setState({
        jobs: this.state.jobs,
        jobsDisplay: this.state.jobs,
        showJob: newJob
      })
    })
  }

  editJob = (job) => {
    fetch(`http://localhost:3000/jobs/${job.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ 
        title: job.title,
        company: job.company,
        location: job.location,
        status: job.status,
        interview: job.interview,
        dateApplied: job.dateApplied
      })
    })
    .then(resp => resp.json())
    .then(updatedJob => {
      let updatedDisplayJobList = this.state.jobsDisplay.map(job => 
        job.id === updatedJob.id ? job = updatedJob : job
      )
      let updatedJobList = this.state.jobs.map(job => 
        job.id === updatedJob.id ? job = updatedJob : job
      )
      this.setState({
        jobsDisplay: updatedDisplayJobList,
        jobs: updatedJobList,
      })
    })
  }


  deleteJob = (job) => {
    fetch(`http://localhost:3000/jobs/${job.id}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(remainingJobs => {
      this.setState({
        jobs: remainingJobs,
        jobsDisplay: remainingJobs
      })
    })
  }


  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    }, ()=> {this.handleJobDisplay()})
  }

  handleSort = (event) => {
    this.setState({
      sort: event.target.getAttribute("name")
    }, () => this.handleJobDisplay() )
  } 

  setFilter = (event) => {
    this.setState({
      filter: event.target.dataset.filter
    }, ()=> {this.handleJobDisplay()})
  }

  handleJobDisplay = () => {
    let jobList = this.state.jobs
    if (!!this.state.filter){
      this.state.filter === "*"
      ? jobList = this.state.jobs
      : jobList = this.state.jobs.filter( job => job.status === this.state.filter )
    } 
    if (!!this.state.sort){
      this.state.sortAsc 
      ? jobList = jobList.sort( (jobA, jobB) => jobA[this.state.sort] > jobB[this.state.sort] ? 1 : -1 )
      : jobList = jobList.sort( (jobA, jobB) => jobA[this.state.sort] > jobB[this.state.sort] ? -1 : 1 )
      this.state.sortAsc = !this.state.sortAsc
    }
    if (!!this.state.search){
      jobList = jobList.filter(job => job.title.toLowerCase().includes(this.state.search.toLowerCase()) || job.company.toLowerCase().includes(this.state.search.toLowerCase()) || job.location.toLowerCase().includes(this.state.search.toLowerCase()))
    }
    this.setState({
      jobsDisplay: jobList
    })
  }

  render(){
    
    return (
      <div>
        <JobForm addJob={this.addJob}/>
         <List title = " " items={this.state.jobsDisplay} handleShowJob={this.handleShowJob} handleSearch={this.handleSearch} setFilter={this.setFilter} handleSort={this.handleSort}/>
         <JobModalShow job={this.state.showJob} deleteJob={this.deleteJob} editJob={this.editJob}/> 
      </div>
    )
  }

}

