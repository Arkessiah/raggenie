import { API_URL } from "src/config/const"
import GetService from "src/utils/http/GetService"
import PostService from "src/utils/http/PostService"

export const getBotConfiguration = ()=>{
    return  GetService(API_URL + "/connector/configuration/list")
}


export const getLLMProviders = ()=>{
    return GetService(API_URL + "/provider/llmproviders")
}


export const saveBotConfiguration = (configID, saveData = {})=>{
    let apiURL = "/connector/configuration/create"
    if(configID){
       apiURL = `/connector/configuration/update/${configID}`
    }
   return PostService(`${API_URL}${apiURL}`, {
       short_description: saveData.botShortDescription,
       long_description: saveData.botLongDescription,
       name: saveData.botName,
       status: 1,
       capabilities: []
   })
}


export const testInference = (configID, data)=>{
    return PostService(`${API_URL}/provider/test-inference-credentials`, {
        "name": data.inferenceName,
        "apikey": data.inferenceAPIKey,
        "llm_provider": data.inferenceLLMProvider,
        "model":data.inferenceModelName ,
        "config_id": configID,
        "endpoint": data.inferenceEndpoint
    })
}

export const saveBotInferene = (configID, inferenceID, saveData = {})=>{
    let apiURL = "/inference/create"

    if(inferenceID){
        apiURL = `/inference/update/${inferenceID}`
    }

    return PostService(`${API_URL}${apiURL}`, {
        "name": saveData.inferenceName,
        "apikey": saveData.inferenceAPIKey,
        "llm_provider": saveData.inferenceLLMProvider,
        "model":saveData.inferenceModelName ,
        "config_id": configID,
        "endpoint": saveData.inferenceEndpoint
    })
}


export const getVectorFields=()=>{
    return GetService(API_URL + "/vectordb/list/all")
}

export const testVectorDb = (data) => {
    console.log("vectorDb",data);
    
    return PostService(`${API_URL}/vectordb/test_credentials`, {
        "vectordb_config": {
            "key": "chroma",
            "path": "./chroma"
        },
        "embedding_config": {
            "provider": "default",
            "params": {},
            "key": "chroma"
        }
    })
}

export const saveVectorDb = (vectorDbsID)=>{
    let apiURL = "/vectordb/create"

    if(vectorDbsID){
        apiURL = `/api/v1/vectordb/${vectorDbsID}`
    }

    return PostService(`${API_URL}${apiURL}`, {
            "vectordb": "string",
            "vectordb_config": {},
            "config_id": 0,
            "embedding_config": {}
    })
}
