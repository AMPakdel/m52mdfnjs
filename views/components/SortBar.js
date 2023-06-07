import React, { Component } from "react";
import styles from "./SortBar.module.css";

/**
* Props of SortBar Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SortBar extends Component {
    
    constructor(props){
        super(props);
    }
    
    componentDidMount(){

    }

    onSelect=(key)=>{
        
        this.props.onSortSelect(key);
    }
    
    render(){
        return(
            <div className={styles.con+" md_card_shd "+this.props.className}>

                {/* <div className={styles.text}>{"مرتب سازی بر اساس "}</div> */}
                
                <Button name={"جدیدترین"}
                selected={this.props.selected==="sm_newest"}
                onSelect={()=>this.onSelect("sm_newest")}/>

                <Button name={"آخرین بازدید"}
                selected={this.props.selected==="sm_viewed"}
                onSelect={()=>this.onSelect("sm_viewed")}/>

                <Button name={"آخرین به‌روزرسانی"}
                selected={this.props.selected==="sm_updated"}
                onSelect={()=>this.onSelect("sm_updated")}/>

            </div>
        )
    }
}

function Button(props){
    let addClass = "";
    if(props.selected){
        addClass += " bgsc1"
    }
    if(props.className){
        addClass += " "+props.className;
    }
    return(
        <div className={styles.btn_con+" amp_btn "+addClass} onClick={props.onSelect}>
            {props.name}
        </div>
    )
}