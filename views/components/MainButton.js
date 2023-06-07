import React, { Component } from "react";
import Loading from "./Loading";
import styles from "./MainButton.module.css";

/**
 * Props of MainButton Component
 * @typedef Props
 * @property {string} className
 * @property {string} titleClassName
 * @property {React.CSSProperties} style
 * @property {string} title
 * @property {boolean} disabled
 * @property {boolean} borderMode
 * @property {boolean} whiteBorder
 * @property {boolean} rightArrow
 * @property {boolean} leftArrow
 * @property {function} onClick
 * @property {boolean} loading
 * 
 * @extends {Component<Props>}
 */
export default class MainButton extends Component {

    centerize=()=>{

        this.con.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    onClick=(e)=>{

        if(this.props.loading)return;

        this.props.onClick && this.props.onClick(e);
    }
    
    render(){

        let add_class = "";

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        if(this.props.borderMode){

            add_class += styles.border_mode+" bpc1 ";

        }else{

            add_class += "bgpc1 ";
        }

        if(!this.props.rightArrow && !this.props.leftArrow){
            add_class += styles.more_padding+" ";
        }

        if(this.props.disabled){
            add_class += " bgdc2 "
        }

        if(this.props.loading){

            add_class += " bpc1 bglc1 "+styles.border_mode;
        }

        if(!this.props.loading && !this.props.disabled){
            add_class += " amp_btn";
        }

        return(
            
            <div className={styles.mbtn_con+" bdyt "+add_class} 
            onClick={this.onClick} 
            style={this.props.style}
            ref={r=>this.con=r}>

                {
                    this.props.loading?
                    <Loading scale={0.3}/>:
                    <>
                        {
                            this.props.rightArrow?
                            <img className={styles.rightArrow} src="/svg/btn_rightArrow.svg"/>:
                            null
                        }
                        {
                            this.props.borderMode?
                            <div className={styles.title+" bdyt "+this.props.titleClassName+" fpc2"}>{this.props.title}</div>:
                            <div className={styles.title+" bdyt "+this.props.titleClassName+" flc1"}>{this.props.title}</div>
                        }
                        {
                            this.props.leftArrow?
                            <img className={styles.leftArrow} src="/svg/btn_leftArrow.svg"/>:
                            null
                        }
                    </>
                }
                
            </div>
        )
    }
}