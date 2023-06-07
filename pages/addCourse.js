import React, { Component } from "react";
import dynamic from 'next/dynamic'

const AddCourse = dynamic(() => import("@/views/dynamics/AddCourse"), { ssr: false });

export default class addCourse extends Component {
  
  render(){
    return(
      <AddCourse/>
    )
  }
}