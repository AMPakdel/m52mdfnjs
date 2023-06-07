import React, { Component } from "react";
import styles from "./TextInput.module.css";

/**
* Props of TextInput Component
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
* @property {"password"|"price"} type
* @property {string} autocomplete
* @property {boolean} disabled
* @property {function} OnEnterKeyPressed
* 
* @extends {Component<Props>}
*/
export default class TextInput extends Component {

    state={
        error:"",
    }

    componentDidMount(){

        this.input.addEventListener("keyup", this.onKeyUp)
    }

    onChange=(e)=>{

        if(!this.props.onChange) return;

        let val = e.target.value;

        if(val == ""){
            this.props.onChange(val);
            return;
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

    centerize=()=>{

        this.input.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }

    onKeyUp=(e)=>{

        if (e.keyCode === 13) {

            e.preventDefault();

            if(this.props.OnEnterKeyPressed){

                this.props.OnEnterKeyPressed();
            }
        }
    }
    
    render(){

        let title = "";
        let title_st = {};
        let input_st = {...this.props.inputStyle};
        let add_class = "";

        if(this.props.className){
            add_class += this.props.className+" ";
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

        let m_input_type = "";
        if(this.props.type==="password"){
            m_input_type = "password";
        }else if(this.props.type==="price"){
            m_input_type = "tel";
        }

        return(
            <div className={styles.tput_con +" bdc3 "+add_class} style={this.props.style}>
                
                {
                    this.props.title?
                    <div className={styles.tput_title} style={{...title_st, ...this.props.titleStyle}}>{this.props.title}</div>:null
                }

                {
                    this.props.value?
                    <div className={styles.top_title+" fdc3"}>{this.props.title?this.props.title:this.props.placeholder}</div>:
                    null
                }
                
                <input className={styles.tput_input+" bdyt "+this.props.inputClassName} 
                placeholder={this.props.placeholder} 
                value={this.props.value}
                onChange={this.onChange} 
                style={input_st}
                disabled={this.props.disabled}
                maxLength={this.props.maxLength}
                type={m_input_type}
                autoComplete={this.props.autocomplete}
                ref={r=>this.input=r}/>

                {
                    this.props.error || this.state.error?
                    <div className={styles.error+" fdg"}>{this.props.error || this.state.error}</div>:null
                }

            </div>
        )
    }
}