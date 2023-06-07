import React, { Component } from "react";
import styles from "./Loading.module.css";

/**
 * @typedef Props
 * @property {string} className
 * @property {React.CSSProperties} style
 * @property {number | string} scale
 * 
 * @extends Component<Props>
 */
export default class Loading extends Component {
    
    render(){

        let s={transform:`scale(${this.props.scale || 1})`}
        if(this.props.style){
            s = Object.assign({}, this.props.style);
            s.transform = `scale(${this.props.scale || 1})`;
        }

        return(
            <div className={styles.con+" "+this.props.className}
             style={s}>
                
                <div className={styles.loading_centerize_wrapper}>
                    <div className={styles.lds_shape}>
                        <div className={"bgpc1"}></div>
                        <div className={"bgpc1"}></div>
                        <div className={"bgpc1"}></div>
                    </div>
                </div>
                
            </div>
        )
    }
}