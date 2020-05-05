import React from 'react'
import JobCard from '../components/JobCard'


export default class JobList extends React.Component {

  render(){

    return(
      <div> 
        {this.props.jobs.map(job => <JobCard job={job}/>)}
      </div>
    )

  }

}
