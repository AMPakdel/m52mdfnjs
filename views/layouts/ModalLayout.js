import React, { Component } from "react";
import styles from "./ModalLayout.module.css";
import { Modal } from "antd";

export default class ModalLayout extends Component {

    state = {

        layer1:null,
        layer1_visible:false,
        layer1_destroy:false,

        layer2:null,
        layer2_visible:false,
        layer2_destroy:false,

        layer3:null,
        layer3_visible:false,
        layer3_destroy:false,
    }

    componentDidMount(){
        if(!window.chest){window.chest={}}
        window.chest.setModal = this.setModal;
        window.chest.showModal = this.showModal;
        window.chest.toggleModal = this.toggleModal;
        window.chest.removeModal = this.removeModal;
    }

    componentWillUnmount(){
    }

    setModal = (layer, jsx, cb)=>{
        this.removeModal(layer, ()=>{
            this.state["layer"+layer+"_destroy"] = false;
            this.state["layer"+layer] = jsx;
            this.setState(this.state, cb);
        });
    }

    showModal= (layer, jsx, cb)=>{
        this.removeModal(layer, ()=>{
            this.state["layer"+layer+"_destroy"] = false;
            this.state["layer"+layer+"_visible"] = true;
            this.state["layer"+layer] = jsx;
            this.setState(this.state, cb);
        });
    }

    toggleModal = (layer, visible, cb)=>{
        this.state["layer"+layer+"_visible"] = visible;
        this.setState(this.state, cb)
    }

    removeModal = (layer, cb)=>{
        if(this.state["layer"+layer]){
            this.state["layer"+layer] = null;
            this.state["layer"+layer+"_destroy"] = true;
            this.state["layer"+layer+"_visible"] = false;
            this.setState(this.state, cb)
        }else{
            this.state["layer"+layer+"_destroy"] = true;
            this.state["layer"+layer+"_visible"] = false;
            this.setState(this.state, cb);
        }
    }
    
    render(){

        let s = this.state;

        return(
            <div className={styles.modalay_con}>
                {
                    this.props.children
                }
                
                <Modal open={s.layer1_visible} 
                centered={true}
                footer={null} 
                wrapClassName={styles.modal_wrapper}
                closable={false}
                destroyOnClose={this.state.layer1_destroy}
                className={styles.modal_con}>

                    <div className={styles.modal_wrapper2}>
                        <div className={styles.modal_wrapper3}>
                            {
                                s.layer1
                            }
                        </div>
                    </div>

                </Modal>
            
                <Modal open={s.layer2_visible} 
                centered={true}
                footer={null} 
                wrapClassName={styles.modal_wrapper}
                closable={false}
                destroyOnClose={this.state.layer2_destroy}
                className={styles.modal_con}>

                    <div className={styles.modal_wrapper2}>
                        <div className={styles.modal_wrapper3}>
                            {
                      
                                s.layer2
                            }
                        </div>
                    </div>

                </Modal>
            
                <Modal open={s.layer3_visible} 
                centered={true}
                footer={null} 
                wrapClassName={styles.modal_wrapper}
                closable={false}
                destroyOnClose={this.state.layer3_destroy}
                className={styles.modal_con}>

                    <div className={styles.modal_wrapper2}>
                        <div className={styles.modal_wrapper3}>
                            {
                                s.layer3
                            }
                        </div>
                    </div>

                </Modal>
                
            </div>
        )
    }
}