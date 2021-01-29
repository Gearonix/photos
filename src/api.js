import * as axios from 'axios';


const API = {
    loginAPI(data){
        // debugger;
        return axios.post('http://localhost:4001/login',data)
    },
    registerAPI(data){
        return axios.post('http://localhost:4001/register',data);
    },
    addImageAPI(data){
        let form_data = new FormData();
        form_data.append('file',data.file);
        form_data.append('json',JSON.stringify(data));
        return axios.post('http://localhost:4001/addimage',form_data);
    },
    deleteImageAPI(data){
        return axios.post('http://localhost:4001/deleteimage',data);
    },
    getChosenImagesAPI(data){
        // debugger
        return axios.post('http://localhost:4001/chosenimage',data);
    },
    getImagesAPI(data){
        // debugger
        return axios.post('http://localhost:4001/getimages',data);
    },
    toggleChosenAPI(data){
        return axios.post('http://localhost:4001/togglechosen',data);
    }
}
export default API