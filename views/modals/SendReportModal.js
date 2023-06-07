import React, { Component } from "react";
import MainButton from "../components/MainButton";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import CloseModalLayout from "./CloseModalLayout";
import ResultModal from "./ResultModal";
import styles from "./SendReportModal.module.css";

/**
* Props of SendReportModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SendReportModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email:"",
            title:"",
            message:"",
        }

        window.electronAPI.settingsDidSendReportMessage(this.onSentReport)
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        if(this.state.loading){
            return;
        }

        window.chest.removeModal(1);
    }

    onInput=(key, value)=>{

        if(this.state.loading){
            return;
        }

        let obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    onSend=()=>{

        if(this.state.loading){
            return;
        }

        let obj = {
            email_error:false,
            title_error:false,
            message_error:false,
        };
        let can_continue = true;

        if(this.state.email.length === 0){

            obj.email_error = "فیلد ایمیل خالی است.";
            can_continue=false;

        }else if(!validateEmail(this.state.email)){

            obj.email_error = "ایمیل وارد شده نامعتبر است.";
            can_continue=false;
        }

        if(this.state.title.length < 3){

            obj.title_error = "فیلد عنوان خالی است.";
            can_continue=false;
        }

        if(this.state.message.length < 10){

            obj.message_error = "فیلد توضیحات خالی است.";
            can_continue=false;
        }

        if(can_continue){

            obj.loading = true;

            window.electronAPI.settingsSendReportMessage({
                email: this.state.email,
                title: this.state.title,
                message: this.state.message,
            });
        }

        this.setState(obj);
    }

    onSentReport=()=>{

        this.setState({loading:false});

        setTimeout(()=>{
            
            window.chest.showModal(1, <ResultModal title={
                <>
                <div>{"گزارش شما با موفقیت ثبت گردید."}</div>
                <div>{"مینفو قدردان زحمات شماست."}</div>
                </>
            }/>);

        }, 200);
    }

    render(){
        return(
            <CloseModalLayout
            closable={true}
            onClose={this.onCancel}
            title={"گزارش مشکل و خطا"}>

                <div className={styles.con}>

                    <TextInput className={styles.email}
                    placeholder={"ایمیل"}
                    value={this.state.email}
                    onChange={t=>this.onInput("email", t)}
                    error={this.state.email_error}/>

                    <TextInput className={styles.title}
                    placeholder={"عنوان"}
                    value={this.state.title}
                    maxLength={100}
                    onChange={t=>this.onInput("title", t)}
                    error={this.state.title_error}/>

                    <TextArea className={styles.message}
                    placeholder={"توضیحات"}
                    value={this.state.message}
                    maxLength={1000}
                    onChange={t=>this.onInput("message", t)}
                    error={this.state.message_error}/>

                    <div className={styles.row1}>

                        <MainButton className={styles.send_btn}
                        title={"ارسال"}
                        loading={this.state.loading}
                        onClick={this.onSend}/>

                    </div>
                
                </div>

            </CloseModalLayout>
        )
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
}