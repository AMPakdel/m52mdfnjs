import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Player = dynamic(() => import("@/views/dynamics/Player"), { ssr: false });

export default class player extends Component {
  
  render(){
    return(
      <Player/>
    )
  }
}