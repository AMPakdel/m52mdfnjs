import React, { Component } from "react";
import MainButton from "../components/MainButton";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SendReportModal from "../modals/SendReportModal";
import styles from "./Settings.module.css";

/**
* Props of Settings Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Settings extends Component {
    
    name = "settings"
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);
    }

    onSendMessage=()=>{

        window.chest.showModal(1, <SendReportModal/>);
    }

    onHelpLink=()=>{

        window.electronAPI.settingsOpenHelpLink();
    }
    
    render(){
        return(
            <SideMenuLayout selected={this.name}>

                <div className={styles.con}>

                    <div className={styles.contact_card+" md_card_shd"}>

                        <div className={styles.title1}>{"پشتیبانی"}</div>

                        <div className={styles.row1}>
                            <div className={styles.text1}>{"تلفن پشتیبانی"}</div>
                            <div className={styles.phone}>{env.CONTACT_NUMBER}</div>
                        </div>

                        <div className={styles.info1}>{"ساعت 9 الی 16 به جز روز های تعطیل"}</div>

                        <div className={styles.row2}>

                            <MainButton className={styles.message_btn}
                            title={"گزارش مشکل و خطا"}
                            onClick={this.onSendMessage}/>

                            <MainButton className={styles.help_btn}
                            borderMode={true}
                            title={"راهنمای عمومی مینفو"}
                            onClick={this.onHelpLink}/>

                        </div>

                    </div>


                </div>

            </SideMenuLayout>
        )
    }
}