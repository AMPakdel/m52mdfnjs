import React, { Component } from "react";
import MainButton from "../components/MainButton";
import styles from "./CancelDownloadModal.module.css";
import CloseModalLayout from "./CloseModalLayout";

/**
* Props of CancelDownloadModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CancelDownloadModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            confirm_btn_loading:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        window.chest.removeModal(1);
    }

    onConfirm=()=>{

        window.electronAPI.downloadCancel(this.props.uploadKey);

        this.setState({confirm_btn_loading:true});
    }
    
    render(){
        return(
            <CloseModalLayout
            className={styles.modal_con}
            closable={false}
            onClose={this.onCancel}
            title={"آیا از حذف این آیتم دانلود اطمینان دارید؟"}>

                <div className={styles.con}>

                    <div className={styles.btn_con}>
                        
                        <MainButton className={styles.left_btn+" bgdgi"}
                        title="حذف"
                        loading={this.state.confirm_btn_loading}
                        onClick={this.onConfirm}/>

                        <MainButton className={styles.right_btn}
                        title={"انصراف"}
                        borderMode={true}
                        onClick={this.onCancel}/>
                        
                    </div>

                </div>

            </CloseModalLayout>
        )
    }
}