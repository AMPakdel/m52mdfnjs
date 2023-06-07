import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Index = dynamic(() => import("@/views/dynamics/Index"), { ssr: false });

export default class index extends Component {
  
  render(){
    return(
      <Index/>
    )
  }
}