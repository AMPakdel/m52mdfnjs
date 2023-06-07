
export default class Observer{

    static events = {
        "download":[],
    };


    /**
     * @param {string} event_name 
     * @param {(data)=>{}} observer 
     */
    static register(event_name, observer){

        if(Observer.events[event_name] === undefined){
            console.log(event_name + "is not in events");
        }

        Observer.events[event_name].push(observer);
    }

    /**
     * @param {string} event_name 
     * @param {any} data 
     */
    static notifyAllObservers(event_name, data){

        Observer.events[event_name].forEach(ob=>{
            if(ob && typeof ob == "function"){ ob(data) }
        });
    }

    /**
     * @param {string} event_name 
     * @param {(data)=>{}} observer 
     */
    static unregister(event_name, observer){

        let index = null;

        Observer.events[event_name].forEach((ob, i)=>{
            if(observer === ob){
                index = i;
            }
        });

        if(index !== null){

            Observer.events[event_name][index] = null;
        }
    }
}