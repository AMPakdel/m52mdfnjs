import React, { Component } from "react";
import styles from "./VideoPlayer.module.css";
import { Player, ControlBar } from 'video-react';
import MediaController from "./MediaController";

/**
* Props of VideoPlayer Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class VideoPlayer extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            src:null
        }
    }
  
    componentDidMount(){
    }

    componentWillUnmount(){

        this.MediaController?.removePlayer();
        this.con?.addEventListener("mousemove", this.onConMouseMove);
    }

    reset=()=>{

        this.setState({src:null});
    }

    onLoadPlayerDone=(src)=>{

        this.setState({src}, this.setupController);
    }

    setupController = ()=>{

        this.MediaController.setPlayer(this.player);

        console.log(this.player);

        this.con?.addEventListener("mousemove", this.onConMouseMove);
    }

    toggleFullscreen = ()=>{

        if (!document.fullscreenElement) {

            this.con.requestFullscreen();

        } else if (document.exitFullscreen) {

            document.exitFullscreen();
        }
    }

    onConMouseMove=()=>{

        this.toggleUI(false);
    }

    toggleUI=(hide)=>{

        if(!this.con){return}

        if(hide){
            this.con.style.cursor="none";
        }else{
            this.con.style.cursor="unset";
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    onVideoDoubleClick = (e)=>{

        e.stopPropagation();

        if(this.MediaController){

            this.MediaController.fullscreen();
        }
    }
  
    render(){

        return(
            <>
            {
                this.state.src?
                <div className={styles.video}
                ref={r=>this.con=r}
                onDoubleClick={this.onVideoDoubleClick}>

                    <Player 
                    fluid={false}
                    height={"100%"}
                    width={"100%"}
                    ref={r=>this.player=r}
                    preload={"auto"}
                    autoPlay={true}>

                        <source src={this.state.src} />

                        <ControlBar disableCompletely={true}
                        disableDefaultControls={false} />

                    </Player>

                    <MediaController
                    ref={r=>this.MediaController=r}
                    toggleFullscreen={this.toggleFullscreen}
                    toggleUI={this.toggleUI}
                    type={"video"}/>

                </div>
                :
                <div className={styles.video_prev_finished}
                style={{backgroundImage:`url(${"/img/voice_background.svg"}`}}>

                    <div className={styles.video_prev_title+" flc1"}>
                        {this.props.number+" "+this.props.title}
                    </div>

                    <img className={styles.video_prev_play_img} 
                    src={"/img/player_play.svg"}
                    onClick={this.props.onOpenPlayer}/>

                </div>
            }
            </>
        )
    }

}