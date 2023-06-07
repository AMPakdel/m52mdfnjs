import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Settings = dynamic(() => import("@/views/dynamics/Settings"), { ssr: false });

export default class settings extends Component {
  
  render(){
    return(
      <Settings/>
    )
  }
}