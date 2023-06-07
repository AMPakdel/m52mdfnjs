import { checkCustomRoutes } from "node_modules/next/dist/lib/load-custom-routes";
import React, { Component } from "react";
import MainButton from "../components/MainButton";
import MainLayout from "../layouts/MainLayout";
import UpdateModal from "../modals/UpdateModal";
import styles from "./Splash.module.css";

/**
* Props of Splash Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Splash extends Component {
    
    name = "splash"

    constructor(props){
        super(props);
        this.state = {
            show_retry_btn:false,
            connection_check_loading:false,
        }

        window.electronAPI.failedConnection(this.onFailConnection);
        window.electronAPI.showUpdateModal(this.onUpdateModal);
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);
    }

    onFailConnection = (event, value)=>{

        console.log("onFailConnection", event, value);

        this.setState({show_retry_btn:true, connection_check_loading:false});
    }

    onRetryConnectionCheck = ()=>{

        window.electronAPI.retryConnection();

        this.setState({connection_check_loading:true});
    }

    onUpdateModal = (event, value)=>{

        window.chest.showModal(1, <UpdateModal data={value}/>);
    }
    
    render(){
        return(
            <MainLayout>

                <div className={styles.con+" bgw"}>

                    <img className={styles.main_logo+" animate__bounceInDown"} src={"/img/minfo_logo.svg"}/>

                    {
                        this.state.show_retry_btn?
                        <div className={styles.retry_sec}>

                            <div className={styles.error_tx+" fdg"}>{"خطای اتصال به سرور"}</div>

                            <MainButton className={styles.retry_btn}
                            title={"تلاش مجدد"}
                            onClick={this.onRetryConnectionCheck}
                            loading={this.state.connection_check_loading}/>

                        </div>:null
                    }

                </div>
                
            </MainLayout>
        )
    }
}