import apiConfigData from "../config/api.json";
const axios = require('axios')


const { APIUrl, addAthlete, listAthletes, deleteAthlete } = apiConfigData

export class AthleteManager {
    /**
     * @description Managed api calls for athletes page
     */

    async addAthlete(payload){
        try{
            console.log(APIUrl+addAthlete)
            console.log(payload)
            const res = await axios.post(APIUrl+addAthlete, payload,  {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials':true
        }})
            if (res.status=='200'){
                return true
            }
            else{
                return false
            }
        }catch(e){throw e;}
    }

    async listAthletes(){
        try{
            console.log(APIUrl+listAthletes)
            const res = await axios.get(APIUrl+listAthletes, {headers: {"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials':true
        }})
            if (res.status=='200'){
                console.log(res.data)
                return res.data.data
            }
            else{
                return false
            }
        }catch(e){throw e;}
    }

    async getAthlete(id){
        try{
            console.log(APIUrl+'/'+id)
            const res = await axios.get(APIUrl+'/'+id)
            if (res.status=='200'){
                console.log(res.data)
                return res.data.data
            }
            else{
                return false
            }
        }catch(e){throw e;}
    }

    async editAthlete(id,payload){
        try{
            console.log(APIUrl+'/'+id)
            const res = await axios.put(APIUrl+'/'+id, payload)
            if (res.status=='200'){
                console.log(res.data)
                return res.data.data
            }
            else{
                return false
            }
        }catch(e){throw e;}
    }

    async deleteAthlete(id){
        try{
            console.log(APIUrl+id)
            const res = await axios.delete(APIUrl+'/'+id, {headers: {"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials':true
        }})
            if (res.status=='200'){
                return true
            }
            else{
                return false
            }
        }catch(e){throw e;}
    }
}