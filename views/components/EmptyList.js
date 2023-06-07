import React, { Component } from "react";
import styles from "./EmptyList.module.css";

/**
 * @typedef Props
 * @property {React.CSSProperties} style
 * @property {string} className
 * @property {string} title
 * 
 * @extends Component<Props>
 */
export default class EmptyList extends Component {
    
    render(){
        return(
            <div className={styles.con+" bgw "+this.props.className} style={this.props.style}>

                <img className={styles.img} src={"/img/info_b.svg"}/>

                {
                    this.props.title?
                    <div className={styles.text+" hrot"}>{this.props.title}</div>:
                    <div className={styles.text+" hrot"}>{"!آیتمی برای نمایش موجود نیست"}</div>
                }
                
            </div>
        )
    }
}