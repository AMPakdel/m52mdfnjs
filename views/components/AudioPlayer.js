import React, { Component } from "react";
import { Player } from "video-react";
import styles from "./AudioPlayer.module.css";
import MediaController from "./MediaController";

/**
* Props of AudioPlayer Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AudioPlayer extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new AudioPlayerController(this);
        this.state = {
            src:null
        }
    }
    
    componentDidMount(){

        window.electronAPI.playerLoadPlayer(this.props.uploadKey);
    }

    componentWillUnmount(){

        this.MediaController.removePlayer();
    }

    reset=()=>{

        this.setState({src:null});
    }

    onLoadPlayerDone = (src)=>{

        console.log(src);

        this.setState({src}, this.setupController);
    }

    setupController = ()=>{

        this.MediaController.setPlayer(this.player);
    }
    
    render(){
        return(
            <div className={styles.audio_view_finished}
            style={{backgroundImage:`url(${"/img/voice_background.svg"}`}}>

                <div className={styles.audio_prev_title+" flc1"}>
                    {this.props.number+" "+this.props.title}
                </div>

                <img className={styles.audio_center_img}
                src={"/img/voice_center_img.svg"}/>

                {
                    this.state.src?
                    <audio ref={r=>this.player=r}
                    src={this.state.src} 
                    autoPlay={false}
                    type="audio/mpeg"/>
                    :null
                }

                <MediaController
                ref={r=>this.MediaController=r}
                type={"audio"}/>

            </div>
        )
    }
}