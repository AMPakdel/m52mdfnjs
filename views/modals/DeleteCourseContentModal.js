import React, { Component } from "react";
import MainButton from "../components/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./DeleteCourseContentModal.module.css";

/**
* Props of DeleteCourseContentModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class DeleteCourseContentModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            confirm_btn_loading:false,
        }

        window.electronAPI.myCourseDeleteFilesDone(this.onDeleteFilesDone);
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        window.chest.removeModal(2);
    }

    onConfirm=()=>{

        setTimeout(()=>{
            window.electronAPI.myCourseDeleteFiles(this.props.coursePk);
        }, 600);

        this.setState({confirm_btn_loading:true});
    }

    onDeleteFilesDone=()=>{

        this.setState({confirm_btn_loading:false});
        
        this.onCancel();
    }
    
    render(){
        return(
            <CloseModalLayout
            className={styles.modal_con}
            closable={false}
            onClose={this.onCancel}
            title={"آیا از حذف فایل های این دوره اطمینان دارید؟"}>

                <div className={styles.con}>

                    <div className={styles.title}>
                        {"در صورت حذف، برای مشاهده دوره باید دوباره فایل های دوره را دانلود کنید."}
                    </div>

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