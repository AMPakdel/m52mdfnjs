import React, { Component } from "react";
import MainButton from "../components/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./NotEnoughSpaceModal.module.css";

/**
* Props of NotEnoughSpaceModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class NotEnoughSpaceModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onClose=()=>{

        if(this.props.onClose){
            this.props.onClose();
        }else{
            window.chest.removeModal(1);
        }
    }
    
    render(){
        return(
            <CloseModalLayout
            className={styles.con}
            closable={false}
            onClose={this.onCancel}>
                
                <div className={styles.wrapper}>

                    <img className={styles.img} src={"/img/error_red.svg"}/>

                    <div className={styles.title}>{"فضای ذخیره سازی برای انجام این عملیات کافی نیست."}</div>

                    <MainButton className={styles.close}
                    onClick={this.onClose}
                    borderMode={true}
                    title={"بستن"}/>

                </div>
                
            </CloseModalLayout>
        )
    }
}