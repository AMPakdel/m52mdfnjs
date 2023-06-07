import DownloadsController from "@/controllers/DownloadsController";
import Observer from "@/utils/Observer";
import React, { Component } from "react";
import DownloadCard from "../components/DownloadCard";
import EmptyList from "../components/EmptyList";
import SideMenuLayout from "../layouts/SideMenuLayout";
import styles from "./Downloads.module.css";

/**
* Props of Downloads Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Downloads extends Component {

    name = "downloads"
    
    constructor(props){
        super(props);
        this.controller = new DownloadsController(this);
        this.state = {
            downloadings: [],
            completeds: [],
        }

        window.electronAPI.downloadsSetList(this.controller.downloadsSetList);
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);

        Observer.register("download", this.controller.downloadObserver);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);

        Observer.unregister("download", this.controller.downloadObserver);
    }
    
    onStartDownload = (download)=>{

        this.controller.onStartDownload(download);
    }

    onPauseDownload = (download)=>{

        this.controller.onPauseDownload(download);
    }

    onCancelDownload = (download)=>{

        this.controller.onCancelDownload(download);
    }

    onShowContent = (download)=>{

        this.controller.onShowContent(download);
    }

    render(){
        return(
            <SideMenuLayout selected={this.name}>

                <div className={styles.con}>

                    <div className={styles.wrapper}>

                        {
                            this.state.downloadings.length?
                            <div className={styles.downloadings_con}>
                            <div className={styles.sec_title+" tilt fdc2"}>{"در حال دانلود"}</div>
                            {
                                this.state.downloadings.map((v,i)=>(
                                    <DownloadCard key={`a${i}`}
                                    onStart={this.onStartDownload}
                                    onPause={this.onPauseDownload}
                                    onCancel={this.onCancelDownload}
                                    onShow={this.onShowContent}
                                    data={v}/>
                                ))
                            }
                            </div>:null
                        }
                        {
                            this.state.completeds.length?
                            <div className={styles.completeds_con}>
                            <div className={styles.sec_title+" tilt fdc2"}>{"به اتمام رسیده"}</div>
                            {
                                this.state.completeds.map((v,i)=>(
                                    <DownloadCard key={`a${i}`}
                                    onStart={this.onStartDownload}
                                    onPause={this.onPauseDownload}
                                    onCancel={this.onCancelDownload}
                                    onShow={this.onShowContent}
                                    data={v}/>
                                ))
                            }
                            </div>:null
                        }
                        {
                            (!this.state.downloadings.length && !this.state.completeds.length)?
                            <EmptyList style={{minHeight:"30rem"}}
                            title={"محتوایی در لیست دانلودها قرار ندارد."}/>:null
                        }

                    </div>

                </div>

            </SideMenuLayout>
        )
    }
}