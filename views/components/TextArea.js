import React, { Component } from "react";
import styles from "./TextArea.module.css";


/**
* Props of TextArea Component
* @typedef Props
* @property {string} className 
* @property {string} inputClassName
* @property {React.CSSProperties} style
* @property {React.CSSProperties} titleStyle
* @property {React.CSSProperties} inputStyle
* @property {(text:string)=>{}} onChange
* @property {string} value
* @property {string} title
* @property {string} placeholder
* @property {string | boolean} error
* @property {number} maxLength
* @property {function} inputFilter
* @property {string} autocomplete
* @property {boolean} disabled
* @property {function} OnEnterKeyPressed
* 
* @extends {Component<Props>}
*/
export default class TextArea extends Component {

    state={
        error:false
    }

    onChange=(e)=>{

        if(!this.props.onChange) return;
        let val = e.target.value;
        if(val == ""){
            this.props.onChange(val);
            return;
        }

        if(this.props.type == "price"){
            val = priceFormattoInteger(val);
            val = priceFormat(val);
        }

        if(this.props.inputFilter){

            let {value , error} = 
            this.props.inputFilter(this.props.value, val);

            this.props.onChange(value);

            this.setState({error});

        }else{

            this.props.onChange(val);
        }
    }
    
    render(){

        let title = "";
        let add_class = "";
        let title_st = {};

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        if(!this.props.value){
            title_st = {opacity : 0};
        }

        if(this.props.direction){
            input_st.direction = this.props.direction;
        }

        if(!this.props.value && !this.props.static_title){
            title_st.opacity = 0;
            title = this.props.title;
        }

        if(this.props.error){

            add_class += " bdg ";
        }

        return(
            <div className={styles.con+" bdc3 "+add_class}>

                {/* {
                    this.props.title?
                    <div className={styles.tput_title} style={{...title_st, ...this.props.titleStyle}}>{this.props.title}</div>:null
                } */}

                {
                    this.props.value?
                    <div className={styles.top_title+" fdc3"}>{this.props.title?this.props.title:this.props.placeholder}</div>:
                    null
                }
                
                <textarea className={styles.textarea+" bdyt "}
                placeholder={this.props.placeholder}
                value={this.props.value}
                maxLength={this.props.maxLength}
                onChange={this.onChange}/>

                {
                    this.props.error || this.state.error?
                    <div className={styles.error+" fdg"}>{this.props.error || this.state.error}</div>:null
                }
                
            </div>
        )
    }
}