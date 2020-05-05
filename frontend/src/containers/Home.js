import React from 'react'
// import JobForm from '../components/JobForm'
// import Counters from '../components/Counters'
// import List from '../components/List'
// import GreenCrossPiece from '../components/GreenCrossPiece'
// import LogoList from '../components/LogosList'
// import Carousel from '../components/Carousel'
// import Mobile from '../components/Mobile'
// import Jobs from '../containers/Jobs'
import UserTasks from "../components/UserTasks"
import Title from '../components/Title'

// import JobList from '../containers/JobList'

export default class Home extends React.Component{

  render(){
    return(
      <div className="site-wrap">
        
        <Title title = "Tasks" />
        
        <UserTasks user={this.props.user}/>

        {/* <Jobs user={this.props.user}/>  */}

        {/* <Counters /> */}
        {/* <GreenCrossPiece /> */}
        {/* <LogoList /> */}
        {/* <Carousel /> */}
        {/* <Mobile /> */}
      </div>
    )
  }
}