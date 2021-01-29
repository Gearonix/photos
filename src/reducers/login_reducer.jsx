import api from '../api';
import {stopSubmit} from "redux-form";
const initial = {
    user_name : null,
    password : null,
    images : [],
    others : {
        chosen : false
    }
}

const login_reducer = function(state=initial,action){
    switch (action.type){
        case 'SET-PROFILE':
            return {...state,user_name: action.data.user_name,password: action.data.password,images : action.data.images}
        case 'UPDATE-IMAGES':
            return {...state,images : action.images}
        case 'GET-CHOSEN':
            return {...state,others: {...state.others,chosen: action.bool}}
        default:
            return state
    }
}
export let setProfileAC = function(data){
    return{
        type : 'SET-PROFILE',
        data : data
    }
}

export let loginTC = function(data){
    return function(dispatch){
        api.loginAPI(data).then((response) =>{
            if (response.data.code!=0){
                let error = stopSubmit('login',{_error : response.data.message});
                dispatch(error);
                return
            }
            dispatch(setProfileAC(response.data.data))
        })
    }
}
export let registerTC = function(data){
    return function(dispatch){

        api.registerAPI(data).then((response) =>{
            // debugger;
            if (response.data.code!=0){
                let error = stopSubmit('register',{_error : response.data.message});
                dispatch(error);
                return
            }

            dispatch(setProfileAC(response.data.data))
        })
    }
}
export let updateImagesAC = function(images){
    return{
        type : 'UPDATE-IMAGES',
        images : images
    }
}
export let addImageTC = function(data){
    return function(dispatch){
        api.addImageAPI(data).then((response) =>{
            // debugger
            if (response.data.code==0){
                dispatch(updateImagesAC(response.data.images));
            }
        })
    }
}
export let deleteImageTC = function(data){
    return function(dispatch){
        api.deleteImageAPI(data).then((response) =>{
            if (response.data.code==0){
                dispatch(updateImagesAC(response.data.images));
            }

        })
    }
}
export let setChosenAC = function(bool){
    return{
        type : 'GET-CHOSEN',
        bool : bool
    }
}
export let getChosenImagesTC = function(data){
    return function(dispatch){
        api.getChosenImagesAPI(data).then((response) => {
            // debugger
            if (response.data.code==0){
                dispatch(updateImagesAC(response.data.images));
                dispatch(setChosenAC(true))
            }

        })
    }
}
export let getImagesTC = function(data){
    return function(dispatch){
        api.getImagesAPI(data).then((response) => {
            // debugger
            dispatch(updateImagesAC(response.data.images))
            dispatch(setChosenAC(false));
        })
    }
}
export let toggleChosenTC = function(data){
    return function(dispatch){
        api.toggleChosenAPI(data).then((response) =>{

            if (response.data.code==0){
                if (data.isChosen){
                dispatch(getChosenImagesTC(data))
                    // debugger
                return
                }
                // debugger
                dispatch(updateImagesAC(response.data.images));

            }
        })
    }
}
//HELPERS

export default login_reducer;