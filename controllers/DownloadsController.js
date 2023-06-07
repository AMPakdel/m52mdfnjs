import Downloads from "@/views/dynamics/Downloads";

export default class DownloadsController{
    
    /**@param {Downloads} view*/
    constructor(view){
        this.view = view;
    }

    downloadsSetList=(event, data)=>{

        console.log(data);

        let downloadings = [];
        let completeds = [];

        data.forEach(dl => {
            
            if(dl.status === "finished"){

                completeds.push(dl);

            }else{

                //dl.status = "loading";
                downloadings.push(dl);
            }
        });

        downloadings = downloadings.reverse();
        completeds = completeds.reverse();

        this.view.setState({downloadings, completeds});
    }
    
    downloadObserver=({status, data})=>{

        console.log({status, data});

        if(!data.upload_key){
            return;
        }

        this.updateDownloadList(status, data);
    }

    updateDownloadList=(status, data)=>{

        //TODO:: on status error?

        switch(status){

            case "progress":

                if(data?.progress?.total?.percentage){
                    this.updateInDownloadingList(data.upload_key, {
                        percent: Math.floor(data?.progress?.total?.percentage),
                        status: "downloading",
                        downloaded_size: data?.progress?.total?.bytes,
                    });
                }

            break;

            case "paused":

                this.updateInDownloadingList(data.upload_key, {status: "paused"});

            break;

            case "finished":

                this.updateInDownloadingList(data.upload_key, {
                    percent: 100,
                    status: "finished"
                }, ()=>{

                    this.downloadsSetList(null, 
                        this.view.state.downloadings.concat(this.view.state.completeds));
                });

            break;

            case "error":

                this.updateInDownloadingList(data.upload_key, {status: "error"});

            break;
        }
    }

    updateInDownloadingList(upload_key, object, cb){


        let newList = [];

        this.view.state.downloadings.forEach((dl,i)=>{
    
            if(dl.upload_key === upload_key){
    
                newList.push(Object.assign(dl, object));

            }else{

                newList.push(dl);
            }
        });

        console.log("updatingDl", newList);
        
        this.view.setState({downloadings:newList}, cb);
    }
    
    onStartDownload = (download)=>{

        let course_pk = download.course_pk;
        let content = {
            upload_key: download.upload_key,
            title: download.title,
            ext: download.ext,
            size: download.size,
            type: download.type,
            url: download.url,
        }

        window.electronAPI.downloadStart({course_pk, content});

        this.updateInDownloadingList(download.upload_key, {status:"loading"});
    }

    onPauseDownload = (download)=>{

        window.electronAPI.downloadPause(download.upload_key);

        this.updateInDownloadingList(download.upload_key, {status:"loading"});
    }

    onCancelDownload = (download)=>{

        window.electronAPI.downloadCancel(download.upload_key);

        this.updateInDownloadingList(download.upload_key, {status:"loading"});
    }

    onShowContent = (download)=>{

        window.electronAPI.downloadsShowContent({
            course_pk:download.course_pk,
            upload_key: download.upload_key
        });
    }
}