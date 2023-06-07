import { Checkbox } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import MainButton from "../components/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./UpdateModal.module.css";

/**
* Props of UpdateModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UpdateModal extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new UpdateModalController(this);
        this.state = {
            changes: [],
            version_name:"",
            version_code:1,
            must:0,
            url:"",
            update_btn_loading: false,
            skip_update_modal: false,
        }

        let data = this.props.data;

        try{
            this.state.changes = JSON.parse(data.last_changes_list).changes;
        }catch(e){
            console.log(e);
        }

        this.state.version_name = data.version_name;
        this.state.version_code = data.version_code;
        this.state.must = data.must;
        this.state.url = data.url;
    }
    
    componentDidMount(){
    }

    onSkipModalChange = ()=>{

        this.setState({skip_update_modal: !this.state.skip_update_modal});
    }

    onCancel=()=>{

        window.chest.removeModal(1);

        let skip_update_modal = false;
        if(this.state.skip_update_modal){
            skip_update_modal = this.state.version_code;
        }
        
        setTimeout(()=>{
            window.electronAPI.continueWithoutUpdate({skip_update_modal});
        }, 300);
    }

    onUpdate=()=>{

        this.setState({update_btn_loading:true});

        window.electronAPI.opUpdateUrl(this.state.url);

        setTimeout(()=>{
            this.setState({update_btn_loading:false});
        }, 2000);
    }
    
    render(){
        return(
            <CloseModalLayout
            closable={this.state.must===0}
            onClose={this.onCancel}
            title={"لطفا اپلیکیشن خود را به‌روزرسانی کنید."}>

                <div className={styles.con}>

                    <div className={styles.change_title}>{"تغییرات در نسخه "+this.state.version_name+" :"}</div>

                    <ul>
                    {
                        this.state.changes.length?
                        this.state.changes.map((v,i)=>(
                            <li key={i}>{v}</li>
                        )):
                        <li>{"برطرف کردن مشکلات و باگ ها"}</li>
                    }
                    </ul>

                    {
                        this.state.must===0?
                        <div className={styles.skip_sec}>
                            <Checkbox value={this.state.skip_update_modal}
                            onChange={this.onSkipModalChange}/>

                            <div>{"عدم نمایش مجدد این آپدیت"}</div>

                        </div>:null
                    }

                    <div className={styles.btn_con}>
                        
                        <MainButton className={styles.left_btn}
                        title="به‌روزرسانی"
                        loading={this.state.update_btn_loading}
                        onClick={this.onUpdate}/>

                        {
                            !this.state.must?
                            <MainButton className={styles.right_btn}
                            title={"انصراف"}
                            borderMode={true}
                            onClick={this.onCancel}/>:
                            null
                        }

                    </div>

                </div>

            </CloseModalLayout>
        )
    }
}