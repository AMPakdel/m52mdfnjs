import Player from "@/views/dynamics/Player";

export default class PlayerController{
    
    /**@param {Player} view*/
    constructor(view){
        this.view = view;
    }
    
    downloadObserver=({status, data})=>{

        console.log({status, data});

        if(!this.view.PlayerView){
            console.log("this.view.PlayerView ="+this.view.PlayerView);
            return;
        }
        if(!data.upload_key){
            return;
        }

        if(data.upload_key === this.view.state.sc_uploadkey){
            
            this.updatePlayerView(status, data);
        }

        this.updatePlayerList(status, data);
    }

    updatePlayerList=(status, data)=>{

        //TODO:: on status error?

        switch(status){

            case "progress":

                if(data?.progress?.total?.percentage){

                    this.updateInPlaylist(data.upload_key, {
                        download_percent: Math.floor(data?.progress?.total?.percentage),
                        download_status: "downloading"
                    });
                }

            break;

            case "paused":

                this.updateInPlaylist(data.upload_key, {
                    download_status: "paused"
                });

            break;

            case "finished":

                this.updateInPlaylist(data.upload_key, {
                    download_status: "finished"
                });

            break;
        }
    }
    
    updatePlayerView=(status, data)=>{

        //TODO:: on status error?

        switch(status){

            case "progress":

            if(data?.progress?.total?.percentage){

                this.view.PlayerView.showDownloadProgress(data.progress.total.percentage);
            }

            break;

            case "paused":

            this.view.PlayerView.showPausedDownload();

            break;

            case "finished":

            this.view.PlayerView.showDownloadFinished(this.view.state.sc_uploadkey);

            break;
        }
    }

    updateInPlaylist(upload_key, object){

        this.view.state.playlist_data.forEach((v1,i1)=>{
    
            v1.contents.forEach((v2,i2)=>{
    
                if(v2.upload_key === upload_key){
    
                    v2 = Object.assign(v2, object);
                }
            });
        });
        
        this.view.setState({playlist:this.view.state.playlist});
    }
}