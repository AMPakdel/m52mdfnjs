import { Progress, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./DownloadCard.module.css";
import Loading from "./Loading";
import MainButton from "./MainButton";

const downloading_color = "#6F3AF9"
const paused_color = "#F9A83A"
const error_color = "#F93A3A"

/**
* Props of DownloadCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class DownloadCard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
    }

    onPause=()=>{

        if(this.props.data.status==="loading"){
            return;
        }

        this.props.onPause(this.props.data);
    }

    onStart=()=>{

        if(this.props.data.status==="loading"){
            return;
        }

        this.props.onStart(this.props.data);
    }

    onCancel=()=>{

        // if(this.props.data.status==="loading"){
        //     return;
        // }

        this.props.onCancel(this.props.data);
    }

    onShow=()=>{

        this.props.onShow(this.props.data);
    }
    
    render(){

        let d = this.props.data || {};

        let progress_color = downloading_color;
        if(d.status==="paused"){
            progress_color = paused_color;
        }else if(d.status==="error"){
            progress_color = error_color;
        }
        return(
            <div className={styles.con+" bgw md_card_shd " + this.props.className}>

                {
                    d.status==="finished"?
                    null:
                    <img className={styles.close+" amp_btn"} 
                    src={"/img/close_sqr.svg"}
                    onClick={this.onCancel}/>
                }

                <div className={styles.wrapper}>

                    <div className={styles.name+" fdc1"}>{d.title}</div>

                    <div className={styles.title+" fdc2"}>{d.course_title}</div>

                    <div className={styles.row1}>

                        <div className={styles.row2}>

                            {
                                this.renderTextStatus(d.status)
                            }

                        </div>
                        
                        {
                            d.status==="finished"?
                            <MainButton className={styles.show_content}
                            title={"نمایش"}
                            onClick={this.onShow}/>
                            :
                            <div className={styles.perentage}>
                                {(d.downloaded_size/1048576).toFixed(2)+"MB / "+(d.size/1048576).toFixed(2)+"MB ("+d.percent+"%)"}
                            </div>
                        }
                        
                    </div>

                    {
                        d.status==="finished"?
                        null:
                        <Progress className={styles.progress}
                        percent={d.percent}
                        strokeWidth={10}
                        strokeColor={progress_color}
                        trailColor="#ddd"
                        format={()=>null}/>
                    }
                    
                </div>

            </div>
        )
    }

    renderTextStatus=(status)=>{

        if(status === "loading"){
            
            return(
                <div className={styles.status_loading}>
                    <Loading scale={0.25}/>
                </div>
            );

        }else if(status === "finished"){

            return(
                <>
                <div className={styles.status_tx+" fsu"}>{"دانلود به اتمام رسیده."}</div>
                </>
            )
            
        }else if(status === "downloading"){

            return(
                <>
                <div className={styles.status_tx}>{"درحال دانلود"}</div>
                <div className={styles.change_btn+" fpc1"}
                onClick={this.onPause}>{"توقف دانلود"}</div>
                </>
            )

        }else if(status === "paused"){

            return(
                <>
                <div className={styles.status_tx}>{"توقف دانلود"}</div>
                <div className={styles.change_btn+" fpc1"}
                onClick={this.onStart}>{"شروع دانلود"}</div>
                </>
            )

        }else if(status === "error"){

            return(
                <>
                <div className={styles.status_tx+" fdg"}>{"مشکل اتصال به سرور"}</div>
                <div className={styles.change_btn+" fpc1"}
                onClick={this.onStart}>{"تلاش مجدد"}</div>
                </>
            )
        }

        return null;
    }
}