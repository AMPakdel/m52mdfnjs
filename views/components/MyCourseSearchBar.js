import React, { Component } from "react";
import styles from "./MyCourseSearchBar.module.css";

/**
* Props of MyCourseSearchBar Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyCourseSearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            search:"",
        }
    }
    
    componentDidMount(){

        this.input.addEventListener("keypress", this.onInputKeyPress);
    }

    componentWillUnmount(){

        this.input.removeEventListener("keypress", this.onInputKeyPress);
    }

    onInputKeyPress = (event)=>{

        if (event.key === "Enter") {
            event.preventDefault();
            this.search_btn.click();
        }
    }

    onSearchInput=(e)=>{

        this.setState({search:e.target.value});
    }

    onSearch=()=>{

        this.props.onSearch(this.state.search);
    }

    onClear=()=>{

        this.setState({search:""});
        this.props.onSearch(null);
    }
    
    render(){
        return(
            <div className={styles.con+" "+(this.props.className||"")}>

                <img className={styles.search_btn+" amp_btn"} 
                ref={r=>this.search_btn=r}
                src={"/img/search.svg"}
                onClick={this.onSearch}/>
                
                <input className={styles.input+" fdc1"}
                ref={r=>this.input=r}
                placeholder={"جستجو"}
                value={this.state.search}
                onChange={this.onSearchInput}/>

                {
                    this.state.search.length?
                    <img className={styles.clear_search_btn} 
                    src={"/img/clear_search.svg"}
                    onClick={this.onClear}/>
                    :null
                }

            </div>
        )
    }
}