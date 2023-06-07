import React, { Component } from "react";
import MainButton from "../components/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./CourseSettingsModal.module.css";
import DeleteCourseContentModal from "./DeleteCourseContentModal";

/**
* Props of CourseSettingsModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CourseSettingsModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dir: null
        }

        if(props.data.store_dir){
            this.state.dir = props.data.store_dir;
        }

        window.electronAPI.myCourseSelectDirDone(this.onCourseDirSelected);
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        window.chest.removeModal(1);
    }

    onChangeDir=()=>{

        window.electronAPI.myCourseSelectDir(this.props.data.pk);
    }

    onCourseDirSelected=(event, dir)=>{

        this.setState({dir});

        this.props.onCourseDirSelected(dir);
    }

    onDeleteContents=()=>{

        window.chest.showModal(2, <DeleteCourseContentModal coursePk={this.props.data.pk}/>);
    }
    
    render(){
        let d = this.props.data||{};
        return(
            <CloseModalLayout
            closable={true}
            onClose={this.onCancel}
            title={"تنظیمات دوره"}>

                <div className={styles.con}>

                    <div className={styles.title}>{d.title}</div>

                    <div className={styles.dir_sec}>

                        <div className={styles.dir_t1}>{"محل ذخیره سازی :"}</div>

                        <div className={styles.dir_t2}>{this.state.dir}</div>

                        <MainButton className={styles.change_dir}
                        title={"تغییر"}
                        borderMode={true}
                        onClick={this.onChangeDir}/>

                    </div>

                    <MainButton className={styles.delete_btn+" bgdgi"}
                    title={
                        <div className={styles.delete_title}>
                            {"حذف فایل های دوره"}
                            <img className={styles.delete_icon} 
                            src={"/img/delete_wc.svg"}/>
                        </div>
                    }
                    onClick={this.onDeleteContents}/>

                </div>

            </CloseModalLayout>
        )
    }
}