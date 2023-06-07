import React, { Component } from "react";
import dynamic from 'next/dynamic'

const MyCourses = dynamic(() => import("@/views/dynamics/MyCourses"), { ssr: false });

export default class myCourses extends Component {
  
  render(){
    return(
      <MyCourses/>
    )
  }
}