import React, { Component } from "react";
import MainButton from "../components/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./ResultModal.module.css";

/**
* Props of ResultModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ResultModal extends Component {
    
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

                    {this.renderImage()}
                    
                    <div className={styles.title}>
                        {this.props.title}
                    </div>

                    <MainButton className={styles.close}
                    onClick={this.onClose}
                    borderMode={true}
                    title={this.props.buttonTitle||"بستن"}/>

                </div>
                
            </CloseModalLayout>
        )
    }

    renderImage = ()=>{

        if(this.props.type==="error"){
            return <img className={styles.img} src={"/img/error_red.svg"}/>
        }else if(this.props.type==="alert"){
            return <img className={styles.img} src={"/img/error_yellow.svg"}/>
        }else{
            return <img className={styles.img} src={"/img/success_green.svg"}/>
        }
    }
}