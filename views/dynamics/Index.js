import Observer from "@/utils/Observer";
import { Component } from "react";
import NotEnoughSpaceModal from "../modals/NotEnoughSpaceModal";
import AddCourse from "./AddCourse";
import Downloads from "./Downloads";
import MyCourses from "./MyCourses";
import Player from "./Player";
import Settings from "./Settings";
import Splash from "./Splash";

export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            page: null
        }

        window.electronAPI.changePage(this.changePage);
        window.electronAPI.downloadProgress(this.downloadProgress);
        window.electronAPI.downloadError(this.downloadError);
        window.electronAPI.downloadEnd(this.downloadEnd);
        window.electronAPI.downloadDidPause(this.downloadDidPause);
        window.electronAPI.downloadDidCancel(this.downloadDidCancel);
        window.electronAPI.notEnoughStorageSpace(this.showSpaceModal);
    }
    
    
    componentDidMount(){

        window.electronAPI.webContentDidMount();
    }

    componentWillUnmount(){

        window.electronAPI.webContentWillUnmount();
    }

    changePage = (event, page, data)=>{

        let jsx = <div/>

        console.log("opening page :"+page);

        switch(page){
            case "splash": jsx = <Splash data={data}/>;break;
            case "addCourse": jsx = <AddCourse data={data}/>;break;
            case "myCourses": jsx = <MyCourses data={data}/>;break;
            case "settings": jsx = <Settings data={data}/>;break;
            case "downloads": jsx = <Downloads data={data}/>;break;
            case "player": jsx = <Player data={data}/>;break;
        }

        this.setState({page:jsx});
    }

    downloadProgress = (event, data)=>{

        let d = {status:"progress", data}

        Observer.notifyAllObservers("download", d);
    }

    downloadError = (event, data)=>{

        let d = {status:"error", data}

        Observer.notifyAllObservers("download", d);
    }

    downloadEnd = (event, data)=>{

        let d = {status:"finished", data}

        Observer.notifyAllObservers("download", d);
    }

    downloadDidPause = (event, data)=>{

        let d = {status:"paused", data}

        Observer.notifyAllObservers("download", d);
    }

    downloadDidCancel = (event, data)=>{

        let d = {status:"canceled", data}

        Observer.notifyAllObservers("download", d);
    }

    showSpaceModal = (event, data)=>{

        window.chest.showModal(1, <NotEnoughSpaceModal/>)
    }

    render(){
        return(
            <>
                {this.state.page}
            </>
        )
    }
}