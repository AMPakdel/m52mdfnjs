import React, { Component } from "react";
import MainButton from "../components/MainButton";
import TextArea from "../components/TextArea";
import SideMenuLayout from "../layouts/SideMenuLayout";
import styles from "./AddCourse.module.css";

/**
* Props of AddCourse Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AddCourse extends Component {

    name = "addCourse"
    
    constructor(props){
        super(props);
        this.state = {
            lk:"",
            lk_error: false,
            store_dir: "",
            confrim_loading:false,
        }

        window.electronAPI.addCourseSetDir(this.addCourseSetDir);
        window.electronAPI.addCourseConfirmError(this.onConfirmError);
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);
    }

    addCourseSetDir=(event, value)=>{

        this.setState({store_dir:value});
    }

    onLk=(v)=>{

        this.setState({lk:v});
    }

    onHelpLink=()=>{

        window.electronAPI.addCourseHelpLink();
    }

    onChangeDir=()=>{

        window.electronAPI.addCourseSelectDir();
    }

    onConfirm=()=>{

        if(this.state.lk.length < 4){
            this.setState({lk_error:"کد خرید نامعتبر است."});
            return;
        }

        this.setState({confrim_loading:true, lk_error:false});

        setTimeout(()=>{
            window.electronAPI.addCourseConfirm({
                lk: this.state.lk,
                dir: this.state.store_dir,
            });
        }, 500);
    }

    onConfirmError=(event, data)=>{

        this.setState({confrim_loading:false, lk_error:data});
    }
    
    render(){
        return(
            <SideMenuLayout selected={this.name}>

                <div className={styles.con}>

                    <div className={styles.top_text+" fdc1 bdyt"}>
                        {"برای ثبت دوره جدید کد خرید دوره را وارد کنید."}
                    </div>

                    <TextArea className={styles.lk_input}
                    placeholder={"کد خرید را اینجا وارد کنید"}
                    title={"کد خرید"}
                    value={this.state.lk}
                    error={this.state.lk_error}
                    onChange={this.onLk}/>
                    
                    {
                        this.state.lk_error?
                        <div className={styles.help_link+" fpc2 cpnt"}
                        onClick={this.onHelpLink}>
                            {"مشاهده راهنما"}</div>
                        :<div className={styles.help_link}/>
                    }
                    
                    <div className={styles.dir_sec}>

                        <div className={styles.dir_t1}>{"محل ذخیره سازی :"}</div>

                        <div className={styles.dir_t2}>{this.state.store_dir}</div>

                        <MainButton className={styles.change_dir}
                        title={"تغییر"}
                        borderMode={true}
                        onClick={this.onChangeDir}/>

                    </div>

                    <MainButton className={styles.confirm_btn}
                    title={"تایید"}
                    onClick={this.onConfirm}
                    loading={this.state.confrim_loading}/>

                    <div className={styles.text1+" fdc1"}>{text1}</div>

                </div>
                
            </SideMenuLayout>
        )
    }
}

const text1 = "تمامی ویدئو های این دوره توسط واترمارک های پنهان و پیدا محافظت می شوند و هرگونه کپی برداری از آنها قابل پیگیری بوده و پیگرد قانونی دارد."