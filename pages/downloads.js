import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Downloads = dynamic(() => import("@/views/dynamics/Downloads"), { ssr: false });

export default class downloads extends Component {
  
  render(){
    return(
      <Downloads/>
    )
  }
}