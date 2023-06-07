import PlayerController from "@/controllers/PlayerController";
import Observer from "@/utils/Observer";
import React, { Component } from "react";
import PlayerList from "../components/PlayerList";
import PlayerView from "../components/PlayerView";
import MainLayout from "../layouts/MainLayout";
import styles from "./Player.module.css";

/**
* Props of Player Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Player extends Component {
    
    name = "player"
    
    constructor(props){
        super(props);
        this.controller = new PlayerController(this);
        this.state = {

            list_toggle:"opened",
            playlist_data:[],
            list_ative_key:[],
            
            default_sc_uploadkey:props.data.app_selected_upload_key,
            sc_uploadkey:null,
            sc_course_pk:props.data.pk,

            player_status:"ct_video_finished",
            video_src:"http://127.0.0.1:1447/video.mp4",
        }

        window.electronAPI.playerSetPlaylist(this.setupPlaylist);
        window.electronAPI.playerLoadPlayerDone(this.onLoadPlayerDone);
        window.electronAPI.playerReleasePlayerDone(this.onReleasePlayerDone);
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);

        Observer.register("download", this.controller.downloadObserver);

        console.log(this.props.data);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);

        Observer.unregister("download", this.controller.downloadObserver);
    }

    onListToggle=()=>{

        if(this.state.list_toggle=="opened"){

            this.right_side.style.width="0.7rem";
            this.player_con.style.width="calc(100% - 0.7rem)";
            this.setState({list_toggle:"closed"});

        }else{

            this.right_side.style.width="16rem";
            this.player_con.style.width="calc(100% - 16rem)";
            this.setState({list_toggle:"opened"});
        }
    }

    setupPlaylist=(event, playlist_data)=>{

        console.log(playlist_data);

        let selected_content = playlist_data[0]["contents"][0];

        let sc_uploadkey = selected_content.upload_key;

        if(this.state.default_sc_uploadkey){

            sc_uploadkey = this.state.sc_uploadkey;
        }

        let list_ative_key = [];
        playlist_data.forEach((e, i)=>{
            
            list_ative_key.push(i.toString());

            if(this.state.default_sc_uploadkey){

                e.contents.forEach(c=>{

                    if(c.upload_key === this.state.default_sc_uploadkey){

                        selected_content = c;
                    }
                });
            }
        });

        this.setState({playlist_data, list_ative_key, sc_uploadkey}, ()=>{

            this.onContentSelected(selected_content, 1, 1, true);
        });
    }

    onContentSelected=(content, heading_num, content_num, force)=>{

        if(content.upload_key == this.state.sc_uploadkey && !force){
            return;
        }

        window.electronAPI.playerContentSelect({course_pk: this.state.sc_course_pk, 
            upload_key:content.upload_key});
        
        let selected_content = content;
        let sc_uploadkey = content.upload_key;
        let sc_title = content.title;
        let sc_num = content_num +"."+ heading_num;
        let sc_type = content.type;
        let sc_download_status = content.download_status;

        this.setState({
            selected_content,
            sc_uploadkey,
        });

        let status = sc_type+"-"+sc_download_status;
        let download_percent = 0;
        if(sc_download_status == "paused"){
            status = "download_paused";
            download_percent = content.download_percent;
        }

        this.PlayerView.onContentSelected({
            selected_content,
            status,
            download_percent,
            sc_uploadkey,
            sc_title,
            sc_num,
            sc_type,
            sc_download_status,
        });
    }

    onStartDownload=()=>{

        window.electronAPI.downloadStart({course_pk: this.state.sc_course_pk, 
            content:this.state.selected_content});
    }

    onPauseDownload=(upload_key)=>{

        window.electronAPI.downloadPause(upload_key);
    }

    onPlayerListCollapseChange=(ak)=>{

        this.setState({list_ative_key:ak});
    }

    onOpenCreatorSite=()=>{

        window.electronAPI.playerOpenCreatorSite(this.props.data);
    }

    onOpenCoursePage=()=>{

        window.electronAPI.playerOpenCoursePage(this.props.data);
    }

    onLoadPlayer=()=>{

        window.electronAPI.playerLoadPlayer(this.state.sc_uploadkey);
    }

    onLoadPlayerDone=(event, data)=>{

        if(!this.PlayerView){
            return;
        }

        this.PlayerView.showPlayer(data);
    }

    onReleasePlayerDone=(event, data)=>{

        console.log("onReleasePlayerDone");
    }
    
    render(){
        return(
            <MainLayout selected={this.name}>

                <div className={styles.con}>

                    <div className={styles.right_side_con}
                    ref={r=>this.right_side=r}>

                        <PlayerList ref={r=>this.PlayerList=r}
                        listToggle={this.state.list_toggle}
                        listActiveKey={this.state.list_ative_key}
                        selectedUploadKey={this.state.sc_uploadkey}
                        onListToggle={this.onListToggle}
                        onContentSelected={this.onContentSelected}
                        onCollapseChange={this.onPlayerListCollapseChange}
                        onOpenCreatorSite={this.onOpenCreatorSite}
                        onOpenCoursePage={this.onOpenCoursePage}
                        data={this.state.playlist_data}/>

                    </div>

                    <div className={styles.player_con+" bgdc1"}
                    ref={r=>this.player_con=r}>

                        <PlayerView ref={r=>this.PlayerView=r}
                        coursePK={this.state.sc_course_pk}
                        onLoadPlayer={this.onLoadPlayer}
                        onStartDownload={this.onStartDownload}
                        onPauseDownload={this.onPauseDownload}/>

                    </div>

                </div>

            </MainLayout>
        )
    }
}