const initial = {
    images : []
}

const photos_reducer = function(state=initial,action){
    switch (action.type){
        case 'GET-IMAGES':
            return state
        default:
            return state
    }
}

export let getImagesTC = function(){
    return function(dispatch){
        api.getImagesAPI
    }
}


export default photos_reducer;