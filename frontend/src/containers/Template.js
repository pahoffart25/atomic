import React from 'react'
import JobForm from '../components/JobForm'
import Counters from '../components/Counters'
import List from '../components/List'
import GreenCrossPiece from '../components/GreenCrossPiece'
import LogoList from '../components/LogosList'
import Carousel from '../components/Carousel'
import Mobile from '../components/Mobile'

export default class Template extends React.Component{

  render(){
    return(
      <div className="site-wrap">
        <JobForm />
        <Counters />
        <List />
        <GreenCrossPiece />
        <LogoList />
        <Carousel />
        <Mobile />
      </div>
    )
  }
}