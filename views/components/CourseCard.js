import React, { Component } from "react";
import CourseSettingsModal from "../modals/CourseSettingsModal";
import styles from "./CourseCard.module.css";

/**
* Props of CourseCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export class BarCourseCard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount(){
    }

    onViewCourse=()=>{

        window.electronAPI.myCourseViewCourse(this.props.data.pk);
    }

    onSettings=(e)=>{

        e.stopPropagation();
        window.chest.showModal(1, <CourseSettingsModal data={this.props.data} onCourseDirSelected={this.onCourseDirSelected}/>);
    }

    onCourseDirSelected=(dir)=>{

        this.props.onCourseDirSelected(this.props.data.pk, dir);
    }
    
    render(){
        let d = this.props.data || {};
        let edu = educators2Names(d.educators);
        return(
            <div className={styles.bcc_con+" md_card_shd "+this.props.className}
            onClick={this.onViewCourse}>

                <img className={styles.bcc_img} src={d.logo}/>

                <div className={styles.bcc_sec1}>

                    <div className={styles.bcc_title+" fdc1"}>{d.title}</div>

                    <div className={styles.bcc_edu+" fdc2"}>{edu}</div>

                </div>

                <img className={styles.bcc_settings} src={"/img/card_settings.svg"}
                onClick={this.onSettings}/>
                
            </div>
        )
    }
}

function educators2Names(edus=[]){

    let names = "";

    edus.forEach((v,i)=>{

        names+=v.first_name+" "+v.last_name;
        if(i!=(edus.length-1)){
            names+=", "
        }
    });

    return names;
}