import { Progress } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import AudioPlayer from "./AudioPlayer";
import Loading from "./Loading";
import MainButton from "./MainButton";
import styles from "./PlayerView.module.css";
import VideoPlayer from "./VideoPlayer";

/**
* Props of PlayerView Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class PlayerView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            status: "loading",
            course_store_dir: null,
            sc_title: null,
            sc_course_pk: null,
            sc_uploadkey: null,
            sc_type: null,
            sc_num: null,
            sc_download_status: null,
            download_percent: 0,
        }
    }
    
    componentDidMount(){
        
    }

    openDocument=()=>{

        let course_pk = this.props.coursePK;
        let upload_key = this.state.sc_uploadkey;
        window.electronAPI.playerOpenDocument({course_pk, upload_key});
    }

    onStartDownload=()=>{

        this.setState({status:"loading"}, ()=>{

            this.props.onStartDownload(this.state.sc_uploadkey);
        });
        
    }

    onPauseDownload=()=>{

        this.setState({status:"loading"}, ()=>{

            this.props.onPauseDownload(this.state.sc_uploadkey);
        });
    }

    onContentSelected=(state)=>{

        if(state.selected_content.type == "ct_video"){

            this.VideoPlayer?.reset();

        }else{

            this.AudioPlayer?.reset();
        }
        
        this.setState(state);
    }

    showDownloadProgress=(progress)=>{

        if(!isNaN(Number(progress))){
            this.setState({
                status : "downloading",
                download_percent: Math.floor(progress+0.1),
            });
        }
    }

    showPausedDownload=()=>{

        this.setState({status : "download_paused"});
    }

    showCanceledDownload=()=>{

        this.setState({status:this.state.sc_type+"-need_download"});
    }

    showDownloadFinished=()=>{
        
        try{
            let content = this.state.selected_content;
            let selected_content = content;
            let sc_type = content.type;
            let sc_download_status = "finished";

            this.setState({
                selected_content,
                status: sc_type+"-"+sc_download_status,
                download_percent: 100,
                //sc_download_status,
            });

        }catch(e){
            console.log(e);
        }
    }

    onOpenPlayer=()=>{

        this.props.onLoadPlayer();
    }

    showPlayer=(url)=>{

        if(this.state.selected_content.type == "ct_video"){

            this.VideoPlayer.onLoadPlayerDone(url);

        }else{

            this.AudioPlayer.onLoadPlayerDone(url);
        }
    }
    
    render(){
        return(
            <div className={styles.con}>

            {
                this.state.status=="loading"?
                <div className={styles.video_prev_finished}>
                    
                    <div className={styles.loading_btn}>
                        
                        <Loading scale={0.35}/>

                    </div>

                </div>:null
            }
            {
                this.state.status=="ct_voice-finished"?
                <AudioPlayer
                ref={r=>this.AudioPlayer=r}
                uploadKey={this.state.sc_uploadkey}
                number={this.state.sc_num}
                title={this.state.sc_title}/>
                :null
            }
            {
                this.state.status=="ct_video-finished"?
                <VideoPlayer
                ref={r=>this.VideoPlayer=r}
                onOpenPlayer={this.onOpenPlayer}
                upload_key={this.state.sc_uploadkey}
                number={this.state.sc_num}
                title={this.state.sc_title}/>
                :null
            }
            {
                this.state.status=="ct_document-finished"?
                <div className={styles.video_prev_finished}
                style={{backgroundImage:`url(${"/img/voice_background.svg"}`}}>

                    <div className={styles.video_prev_title+" flc1"}>
                        {this.state.sc_num+" "+this.state.sc_title}
                    </div>

                    <MainButton className={styles.open_document_btn}
                    title={"باز کردن فایل متن"}
                    onClick={this.openDocument}/>

                </div>:null
            }
            {
                (this.state.status=="ct_video-need_download" || 
                this.state.status=="ct_voice-need_download" ||
                this.state.status=="ct_document-need_download")?
                <div className={styles.video_prev_finished}>

                    <div className={styles.video_prev_download_btn}
                    onClick={this.onStartDownload}>

                        <img className={styles.video_prev_download_img} 
                        src={"/img/player_download.svg"}/>

                    </div>

                    <div className={styles.video_prev_title+" flc1"}>
                        {this.state.sc_num+" "+this.state.sc_title}
                    </div>

                </div>:null
            }
            {
                this.state.status=="downloading" || this.state.status=="download_paused"?
                <div className={styles.video_prev_finished}>

                    <div className={styles.video_prev_download_btn}
                    onClick={this.state.status=="download_paused"?
                    this.onStartDownload:this.onPauseDownload}>
                        
                        <Progress type="circle"
                        width={84}
                        percent={this.state.download_percent}
                        format={prct=>{
                            if(this.state.status=="download_paused"){
                                return(
                                <img className={styles.download_pause_btn}
                                    src={"/img/player_pause.svg"}/>
                                )
                            }else{
                                return(<div>{prct+"%"}</div>)
                            }
                        }}
                        strokeWidth={8}
                        strokeColor={"#6F3AF9"}/>

                    </div>

                    <div className={styles.video_prev_title+" flc1"}>
                        {this.state.sc_num+" "+this.state.sc_title}
                    </div>

                </div>:null
            }
            </div>
        )
    }
}