import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Splash = dynamic(() => import("@/views/dynamics/Splash"), { ssr: false });

export default class splash extends Component {
  
  render(){
    return(
      <Splash/>
    )
  }
}