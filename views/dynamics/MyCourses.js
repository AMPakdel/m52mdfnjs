import React, { Component } from "react";
import { BarCourseCard } from "../components/CourseCard";
import EmptyList from "../components/EmptyList";
import MyCourseSearchBar from "../components/MyCourseSearchBar";
import SortBar from "../components/SortBar";
import SideMenuLayout from "../layouts/SideMenuLayout";
import styles from "./MyCourses.module.css";

/**
* Props of MyCourses Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyCourses extends Component {

    name = "myCourses"
    
    constructor(props){
        super(props);
        this.state = {
            sort_mode:"sm_newest",
            course_list: [],
        }

        window.electronAPI.myCoursesGetList(this.myCoursesGetList);
    }
    
    componentDidMount(){

        window.electronAPI.pageDidMount(this.name);
    }

    componentWillUnmount(){

        window.electronAPI.pageWillUnmount(this.name);
    }

    sortList=(list, sort_mode)=>{

        let newList = Object.assign([], list);

        newList.sort((a, b)=>{

            if(sort_mode=="sm_newest"){
                
                return b.added_timestamp - a.added_timestamp;

            }else if(sort_mode=="sm_viewed"){

                if(b.last_viewed_timestamp != a.last_viewed_timestamp){

                    return b.last_viewed_timestamp - a.last_viewed_timestamp;

                }else{

                    return b.added_timestamp - a.added_timestamp;
                }

            }else if(sort_mode=="sm_updated"){

                let ad = new Date(a.last_update)
                let bd = new Date(b.last_update)
                if(ad != bd){
                    return bd - ad;
                }else{
                    return b.added_timestamp - a.added_timestamp;
                }
            }
        });

        return newList;
    }

    myCoursesGetList=(event, data)=>{
        this.original_coruse_list = data.list;
        let list = this.sortList(data.list, data.sort_mode);
        this.setState({course_list:list, sort_mode:data.sort_mode});
    }

    onSearch = (string)=>{

        let newList = [];

        if(!string){

            newList = Object.assign([], this.original_coruse_list);
            
        }else{

            this.original_coruse_list.forEach(e=>{
            
                let added = false;
                if(e.title.search(string) != -1){
                    newList.push(e);
                    added=true;
                }
    
                if(!added){
                    e.educators.forEach(edu=>{
                        let full_name = edu.first_name+" "+edu.last_name;
                        if(full_name.search(string)!=-1){
                            if(!added){
                                newList.push(e);
                                added=true;
                            }
                        }
                    });
                }
            });
        }

        newList = this.sortList(newList, this.state.sort_mode);
        this.setState({course_list:newList});
    }

    onSortSelect=(sort_mode)=>{

        let newList = this.sortList(this.state.course_list, sort_mode);
        this.setState({sort_mode, course_list:newList});

        window.electronAPI.myCourseSortModeSelected(sort_mode);
    }
    
    onCourseDirSelected=(pk, new_dir)=>{

        let newList = [];
        this.state.course_list.forEach(e=>{

            if(e.pk === pk){
                e.store_dir = new_dir;
            }
            newList.push(e);
        });

        this.setState({course_list: newList});
    }

    render(){
        return(
            <SideMenuLayout selected={this.name}>

                <div className={styles.con}>

                    <div className={styles.top_bar_con}>

                        <MyCourseSearchBar onSearch={this.onSearch}/>

                        <SortBar selected={this.state.sort_mode}
                        onSortSelect={this.onSortSelect}/>
                        
                    </div>

                    <div className={styles.vertical_cards_wrapper}>

                        {
                            this.state.course_list.length?
                            this.state.course_list.map((v,i)=>(
                                <BarCourseCard key={i} data={v} 
                                onCourseDirSelected={this.onCourseDirSelected}/>
                            )):
                            <EmptyList title={
                               !this.original_coruse_list?.length?
                                "هیچ دوره ای اضافه نشده است!":
                                "هیچ دوره ای یافت نشده!"
                            }/>
                        }

                    </div>


                </div>

            </SideMenuLayout>
        )
    }
}

const fake_course1 = {
    pk: "23k4jk23j4jk234j23",
    id: 5,
    title: 'دوره 24 ساعته زبان عربی',
    has_access: true,
    logo: 'http://dl1.minfo.ir/public_files/apptest/1a-d110-5aabf134bff24938b866019f4e9578d4.jpg',
    educators: [ {
        "id": 1,
        "first_name": "علی",
        "last_name": "هاشم پور",
        "bio": "علی هاشم با 10 سال سابقه آموزش زبان انگلیسی ...",
        "image": "1a-d10-241b01c3768fad23ef0a313e726a4fc6"
    },
    {
        "id": 2,
        "first_name": "هادی",
        "last_name": "مرشدی",
        "bio": null,
        "image": null
    } ],
    store_dir: 'C:\\Users\\pakdel\\Documents\\Minfo\\Courses',
}