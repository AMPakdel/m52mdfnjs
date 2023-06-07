import React, { Component } from "react";
import styles from "./MainLayout.module.css";
import ModalLayout from "./ModalLayout";

/**
* Props of MainLayout Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MainLayout extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MainLayoutController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <ModalLayout>
                <div className={styles.con}>

                    {this.props.children}

                </div>
            </ModalLayout>
        )
    }
}