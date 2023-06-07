import React, { Component } from "react";
import styles from "./SideMenuLayout.module.css";
import ModalLayout from "./ModalLayout";

/**
* Props of SideMenuLayout Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SideMenuLayout extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new SideMenuLayoutController(this);
        this.state = {
            download_notifs: 0,
        }

        window.electronAPI.MenuOnNotification(this.MenuOnNotification)
    }
    
    componentDidMount(){

        if(this.props.selected != "downloads"){
            window.electronAPI.MenuGetNotifications();
        }
    }

    MenuOnNotification=(event, c)=>{
        
        this.setState({download_notifs:c});
    }

    onSelect=(name)=>{

        window.electronAPI.openMenuPage(name);
    }
    
    render(){
        return(
            <ModalLayout>
                <div className={styles.con+" bgw"}>

                    <div className={styles.right_bar}>

                        <img className={styles.logo} src={"/img/minfo_logo_white.svg"}/>
                        
                        <div className={styles.version+" flc1"}>{"نسخه "+env.APP_VERSION_NAME}</div>

                        <MenuItem name={"myCourses"}
                        selected={this.props.selected}
                        onSelect={this.onSelect}
                        title={"دوره‌های من"}/>

                        <MenuItem name={"addCourse"}
                        selected={this.props.selected}
                        onSelect={this.onSelect}
                        title={"افزودن دوره"}/>

                        <MenuItem name={"settings"}
                        selected={this.props.selected}
                        onSelect={this.onSelect}
                        title={"تنظیمات"}/>

                        <MenuItem name={"downloads"}
                        className={styles.downloads}
                        selected={this.props.selected}
                        onSelect={this.onSelect}
                        notification={this.state.download_notifs}
                        title={"دانلود‌ها"}/>

                    </div>

                    <div className={styles.wrapper}>
                        {this.props.children}
                    </div>

                </div>
            </ModalLayout>
        )
    }
}

class MenuItem extends Component{

    render(){

        return(
            <div className={styles.mi_con+" "+(this.props.className||"")}
            onClick={()=>this.props.onSelect(this.props.name)}>
            {
                this.props.selected==this.props.name?
                <>
                <img className={styles.mi_image} src={"/img/menu_"+this.props.name+"_bold.svg"}/>
                <div className={styles.mi_selected_title+" flc1"}>{this.props.title}</div>
                </>:
                <>
                <img className={styles.mi_image} src={"/img/menu_"+this.props.name+".svg"}/>
                <div className={styles.mi_title+" flc1"}>{this.props.title}</div>
                </>
            }
            {
                this.props.notification?
                <div className={styles.notif}>{this.props.notification>99?"+99":this.props.notification}</div>:null
            }
            </div>
        )
    }
}