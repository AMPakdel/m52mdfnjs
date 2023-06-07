import { Collapse, Progress } from "antd";
import React, { Component } from "react";
import MainButton from "./MainButton";
import styles from "./PlayerList.module.css";
const { Panel } = Collapse;

/**
* Props of PlayerList Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class PlayerList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
    }

    onListToggle=()=>{

        if(this.props.listToggle=="opened"){
            
            this.arrow.style.transform="rotate(180deg)";

        }else{

            this.arrow.style.transform="rotate(0deg)";
        }

        this.props.onListToggle();
    }

    renderDownloadStatus=(heading, content)=>{

        if(content.download_status==="paused"){

            console.log("renderDownloadStatus->paused");
            return(
                <Progress type="circle" 
                percent={content.download_percent} width={24}
                strokeColor={"#333"} strokeWidth={8}
                format={prct=>(<img className={styles.download_pause_icon} 
                    src="/img/download_pause.svg"/>)}/>
            )

        }else if(content.download_status==="downloading"){

            return(
                <Progress type="circle" 
                percent={content.download_percent} width={24}
                strokeColor={"#333"} strokeWidth={8}
                format={prct=>(<img className={styles.download_pause_icon} 
                    src="/img/download_downloading.svg"/>)}/>
            )

        }else if(content.download_status==="need_download"){

            return(
                <img className={styles.download_icon}
                src={"/img/download_status.svg"}/>
            )
        }

        return null;
    }

    onContentSelected=(content, heading_num, content_num)=>{

        this.props.onContentSelected(content, heading_num+1, content_num+1);
    }

    onCollapseChange=(ak)=>{
        
        this.props.onCollapseChange(ak);
    }

    onOpenCreatorSite=()=>{

        this.props.onOpenCreatorSite();
    }

    onOpenCoursePage=()=>{

        this.props.onOpenCoursePage();
    }

    onBack=()=>{

        window.electronAPI.openMenuPage("myCourses");
    }
    
    render(){

        let d = this.props.data || [];

        return(
            <div className={styles.con}>

                <div className={styles.wrapper}>

                    <MainButton className={styles.back_btn}
                    title={"بازگشت"}
                    borderMode={true}
                    onClick={this.onBack}/>

                    <div className={styles.tab_head_con+" cpnt bdc3 fpc1"}>

                        {"جلسه ها"}

                        <div className={styles.tab_highlight+" bgpc1"}/>

                    </div>

                    <div className={styles.content_list}>
                    <Collapse activeKey={this.props.listActiveKey} ghost
                    onChange={this.onCollapseChange}>
                    {
                        d.map((v1,i1)=>(
                        <Panel key={`${i1}`}
                        className={styles.panel_con+" "+
                        (i1%2?"bgw":"bglc1")}
                        header={
                            <div className={styles.header_con}>

                                {(i1+1)+". "+v1.title}

                            </div>}>
                        {
                            v1.contents.map((v2, i2)=>(

                                <div key={`b${i2}`} className={styles.content_con +
                                (this.props.selectedUploadKey===v2.upload_key?" bgsc1":"")}
                                onClick={()=>this.onContentSelected(v2, i1, i2)}>

                                    <img className={styles.content_icon}
                                    src={"/img/"+v2.type+"_icon.svg"}/>

                                    <div className={styles.content_title}>
                                        {(i2+1)+"."+(i1+1)+". "+v2.title}
                                    </div>

                                    {
                                        this.renderDownloadStatus(v1, v2)
                                    }

                                </div>
                            ))
                        }
                        </Panel>
                        ))
                    }
                    </Collapse>
                    </div>

                    <MainButton className={styles.link_btn}
                    title={"سایت سازنده دوره"}
                    borderMode={false}
                    onClick={this.onOpenCreatorSite}/>

                    <MainButton className={styles.link_btn}
                    title={"صفحه دوره در سایت"}
                    borderMode={true}
                    onClick={this.onOpenCoursePage}/>

                </div>

                <div className={styles.toggle_btn+" bgdc3"}
                onClick={this.onListToggle}>

                    <img className={styles.arrow} 
                    ref={r=>this.arrow=r}
                    src={"/img/player_list_arrow.svg"}/>

                </div>
                
            </div>
        )
    }
}