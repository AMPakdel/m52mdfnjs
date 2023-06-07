import { Popover, Slider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./MediaController.module.css";

/**
* Props of MediaController Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MediaController extends Component {
    
    /**
     * @type {HTMLAudioElement}
     */
    player;

    constructor(props){
        super(props);
        this.state = {
            is_playing: false,
            total_time: false,
            is_ended: false,
            fullscreen: false,
            current_time: "",
            selected_speed: 1,
            sl_value:0,
            sl_max:0,
            show_speed_popover:false,
        }
    }
    
    componentDidMount(){
    
    }

    isVideo = ()=>{

        if(this.props.type === "video"){
            return true;
        }
        return false;
    }

    isAudio = ()=>{

        if(this.props.type === "audio"){
            return true;
        }
        return false;
    }

    setPlayer = (player)=>{

        this.player = player;

        if(this.isAudio()){
            this.player.addEventListener("loadeddata", this.onLoaded);
            this.player.addEventListener("timeupdate", this.onTimeUpdate);
            this.player.addEventListener("ended", this.onEnded);
        }

        if(this.isVideo()){
            this.player.video.handleLoadedData = this.onLoaded;
            this.player.video.handleTimeUpdate = this.onTimeUpdate;
            this.player.video.handleEnded = this.onEnded;

            this.OhandlePlay = this.player.video.handlePlay;
            this.OhandlePause = this.player.video.handlePause;
            this.player.video.handlePlay = this.play;
            this.player.video.handlePause = this.pause;

            this.mouse_over.addEventListener("mouseover", this.mouseEnter);
            this.mouse_over.addEventListener("mouseout", this.mouseLeave);
        }
        
    }

    removePlayer = ()=>{

        if(this.isAudio()){
            this.player.removeEventListener("loadeddata", this.onLoaded);
            this.player.removeEventListener("timeupdate", this.onTimeUpdate);
            this.player.removeEventListener("ended", this.onEnded);
        }

        if(this.isVideo()){
            this.player.video.handleLoadedData = ()=>{};
            this.player.video.handleTimeUpdate = ()=>{};
            this.player.video.handleEnded = ()=>{};
            this.player.video.handlePlay = ()=>{};
            this.player.video.handlePause = ()=>{};

            this.mouse_over.addEventListener("mouseover", this.mouseEnter);
            this.mouse_over.addEventListener("mouseout", this.mouseLeave);
        }
    }

    onLoaded = ()=>{

        let duration;
        if(this.isVideo()){

            this.mouseLeave();
            duration = this.player.getState().player.duration;
            this.state.is_playing = true;

        }else{

            duration = this.player.duration;
        }

        let time = Math.floor(duration);
        let sl = time;
        time = showTime(time);
        this.setState({
            sl_max: sl,
            total_time: time,
            current_time: "00:00",
        });
    }

    mouseEnter=()=>{

        this.setState({hide:false});

        this.props.toggleUI(false);

        clearTimeout(this.hide_timeout);
    }

    mouseLeave=()=>{

        clearTimeout(this.hide_timeout);

        this.hide_timeout = setTimeout(()=>{

            this.state.show_speed_popover = false;

            this.setState({hide:true});

            this.props.toggleUI(true);

        }, 3000);
    }

    onTimeUpdate = (e)=>{

        let currentTime;
        if(this.isVideo()){
            currentTime = e.target.currentTime;

        }else{
            currentTime = this.player.currentTime;
        }

        let time = Math.floor(currentTime);
        let sl = time;
        time = showTime(time);
        this.setState({ current_time: time, sl_value: sl });
    }

    onEnded = ()=>{

        this.setState({is_playing:false, is_ended:true});
    }

    play = (fromButton)=>{

        if(this.state.is_ended){

            if(this.isVideo()){
                this.player.seek(0);
            }else{
                this.player.currentTime = 0;
            }
            this.state.is_ended = false;
        }

        this.setState({is_playing:true});

        if(fromButton === true){
            this.player.play();
        }else{
            this.OhandlePlay();
        }
    }

    pause = (fromButton)=>{

        this.state.show_speed_popover = false;
        this.setState({is_playing:false});

        if(fromButton === true){
            this.player.pause();
        }else{
            this.OhandlePause();
        }
    }

    backward = ()=>{

        this.state.is_ended = false;
        let jump = 15;
        if(this.isVideo()){

            this.player.replay(jump);

        }else{
            
            let current = this.player.currentTime;
            if(current > 15){
                this.player.currentTime = current - jump;
            }else{
                this.player.currentTime = 0;
            }
        }
    }

    forward = ()=>{

        if(this.isVideo()){
            this.player.forward(30);
        }else{
            let current = this.player.currentTime;
            let total = this.player.duration;
            let jump = 30;
    
            if(total - current > 30){
                this.player.currentTime = current + jump;
            }else{
                this.player.currentTime = total;
            }
        }
    }

    fullscreen=()=>{

        this.state.fullscreen = !this.state.fullscreen;
        this.state.show_speed_popover = false;
        this.setState(this.state);

        this.props.toggleFullscreen();
    }

    onSliderChange = (v)=>{
        
        let duration;
        if(this.isVideo()){
            duration = this.player.getState().player.duration;
        }else{
            duration = this.player.duration;
        }

        if(v == Math.floor(duration)){
            this.state.is_ended = true;
        }else{
            this.state.is_ended = false;
        }

        if(this.isVideo()){

            this.player.seek(v);

        }else{

            this.player.currentTime = v;
        }

        this.setState({ sl_value:v });
    }

    toggleSpeedMenu = ()=>{

        let show_speed_popover = !this.state.show_speed_popover;
        this.setState({show_speed_popover});
    }

    onSpeedSelect = (speed)=>{

        this.player.playbackRate = speed;
        this.state.show_speed_popover = false;
        this.setState({selected_speed:speed});
    }
    
    render(){

        let add_class = "";
        if(this.state.hide){
            add_class += styles.hide;
        }

        return(
            <div className={styles.mouse_over}
            ref={r=>this.mouse_over=r}>

            <div className={styles.con+" "+add_class} ref={r=>this.con=r}>

                {/* <div className={styles.title}>{"1.1 مقدمه"}</div> */}

                <div className={styles.slider_con}>

                    <Slider value={this.state.sl_value}
                    min={0} max={this.state.sl_max}
                    tooltip={{open:false}}
                    onChange={this.onSliderChange}/>

                </div>

                <div className={styles.row1}>

                    <div className={styles.left_side1}>
                        {
                            this.state.total_time?
                            <>
                            <div className={styles.time1}>{this.state.current_time}</div>
                            <div className={styles.time1_5}>{"/"}</div>
                            <div className={styles.time2}>{this.state.total_time}</div>
                            </>:null
                        }
                    </div>

                    <div className={styles.right_side1}>
                        
                        <div className={styles.play_speed_title}>

                            <div className={styles.play_speed_btn} 
                            onDoubleClick={e=>e.stopPropagation()}
                            onClick={this.toggleSpeedMenu}>
                                {this.state.selected_speed+"x"}
                            </div>
                            
                            {
                                this.state.show_speed_popover?
                                <SpeedPopover selectedSpeed={this.state.selected_speed}
                                onSelect={this.onSpeedSelect}/>:null
                            }

                        </div>
                        
                        {
                            this.props.type==="video"?
                            <img src={this.state.fullscreen?"/img/player_minimize.svg":"/img/player_fullscreen.svg"} 
                            className={styles.fullscreen_btn+" "+styles.btn}
                            onClick={this.fullscreen}/>
                            :null 
                        }

                    </div>

                </div>

                <div className={styles.row2}>

                    <img className={styles.frw_btn+" "+styles.btn}
                    src={"/img/player_bwd.svg"}
                    onDoubleClick={e=>e.stopPropagation()}
                    onClick={(e)=>{ e.stopPropagation(); this.backward();}}/>
                    
                    {
                        this.state.is_playing?
                        <img className={styles.play_btn+" "+styles.btn}
                        src={"/img/player_pause.svg"} 
                        onDoubleClick={e=>e.stopPropagation()}
                        onClick={(e)=>{ e.stopPropagation(); this.pause(true);}}/>
                        :
                        <img className={styles.play_btn+" "+styles.btn}
                        src={"/img/player_play.svg"} 
                        onDoubleClick={e=>e.stopPropagation()}
                        onClick={(e)=>{ e.stopPropagation(); this.play(true);}}/>
                    }
                    
                    <img className={styles.frw_btn+" "+styles.btn}
                    src={"/img/player_fwd.svg"}
                    onDoubleClick={e=>e.stopPropagation()}
                    onClick={(e)=>{ e.stopPropagation(); this.forward();}}/>

                </div>
                
            </div>
            </div>
        )
    }
}

function showTime(sec){

    let a = sec>=600? sec % 600 : 0;
    let b = Math.floor(a? a/600: sec/60);
    let c = sec % 60;

    return a+""+b+":"+(c>9?c:"0"+c);
}

class SpeedPopover extends Component{

    speeds = [
        2,
        1.75,
        1.5,
        1.25,
        1,
        0.75,
        0.5,
    ]

    render(){

        return(
            <div className={styles.speed_popover}>

                {
                    this.speeds.map((v,i)=>(
                        <div key={i} className={styles.speed_opt+(this.props.selectedSpeed===v?" fsc1 ":" fw ")}
                        onClick={()=>this.props.onSelect(v)}>
                            {v+"x"}
                        </div>
                    ))
                }

            </div>
        )
    }
    
}