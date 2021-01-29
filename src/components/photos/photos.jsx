import {connect} from "react-redux";
import {deleteImageTC as deleteImage,toggleChosenTC as toggleChosen} from "../../reducers/login_reducer";
import classes from './photos.module.css';
import {Redirect} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import {useState,useEffect} from "react";
import Show from './show/show';
import axios from "axios";
const Photos = function(props){


    let [hiddenMenu,openHiddenMenu] = useState(true)
    let [show,showShow] = useState(false);
    let [menuData,openMenuData] = useState(null);
    let [animateMenu,openAnimateMenu] = useState(false);
    useEffect(mount)

    let elements_data = props.images
    let elements = props.images.map((item,index) => <Image src={item.image} key={index}
                                                           user_name={props.user_name}
                                                           deleteImage={props.deleteImage}
                                                            index={index} getShow={getShow}
                                                           isShow={show} moveMenu={moveMenu}
                                                           clearMenu={clearMenu} sendMenuLogic={sendMenuLogic}
                                                            date={item.date} chosen={item.chosen} />);

    if (!props.user_name){
        return <Redirect to={'/'} />
    }
    if (props.images.length==0){
        return <NoImages chosen={props.isChosen}/>
    }
    function mount(){
        const source = axios.CancelToken.source()
        return function(){
             // openHiddenMenu(true);
             // openMenuData(null);
             // openAnimateMenu(false);
            source.cancel();
        }
    }


    function  getShow(index){
        showShow(index);
    }

    function clear(){
        showShow(false)
    }

    if (typeof show=='number'){
        return <Show index={show} elements={elements} clear={clear}
                    deleteImage={props.deleteImage}
                     elements_data={elements_data} toggleChosen={props.toggleChosen}
                     isChosen={props.isChosen}/>
    }
    let menu = React.createRef();
    function moveMenu(x,y){
        if (menu.current){
            menu.current.style.left = x+'px';
            menu.current.style.top = y+'px';
            openAnimateMenu(true)
            setTimeout(() => openAnimateMenu(false),350);
            openHiddenMenu(false)

        }
    }
    function clearMenu(){
        if (menu.current){
            setTimeout(() =>openHiddenMenu(true),100)
        }
    }
    function sendMenuLogic(data){
        openMenuData(data)
    }
    function deleteMenuImage(){
        if (menuData.image && menuData.user_name){
            props.deleteImage(menuData)
        }
    }
    function selectImage(){
        if (typeof menuData.index=='number'){
            getShow(menuData.index)
        }
    }
    function toggleChosen(){
        let bool = +menuData.chosen==1 ? '0' : '1';
        props.toggleChosen({image : menuData.image,user_name : menuData.user_name,bool : bool});
    }
    let hiddenMenuClass = hiddenMenu ? classes.hidden : null;
    let animatedMenuClass = animateMenu ? classes.animateMenu : null;
    return(
        <div className={!props.isChosen ? classes.main : classes.mainChosenBlock} onContextMenu={(event) => event.preventDefault()} onScroll={clearMenu}>
            <div className={classes.menu+' '+hiddenMenuClass+' '+animatedMenuClass} ref={menu}>
                <ul>
                    <li className={classes.delete} onClick={deleteMenuImage}>Delete</li>
                    <li className={classes.select} onClick={selectImage}>Select</li>
                    <li className={classes.chosen} onClick={toggleChosen}>Chosen</li>
                    <li className={classes.downloadImage}><a href={menuData?.isSrc} download>Download</a></li>
                </ul>
            </div>
        {elements}
        </div>
    )
}


const Image = function(props){
    let src;
    if (props.src){
        try {
            src = require(`./../../../backend/images/${props.src}`);
        }
        catch (error){
        }
    }
    let isSrc = props.src && src && src.default;
    if (!isSrc){
        return <ImagePreloader />
    }
    let image = React.createRef();
    function test(event){
        props.moveMenu(event.clientX-1,event.clientY-1)
        props.sendMenuLogic({image : props.src,user_name : props.user_name,index : props.index,isSrc : isSrc,chosen : props.chosen})
        image.current.focus();
    }
    if (typeof props.isShow=='number'){
        return(
            <div className={classes.inline}>
                <img src={isSrc} className={classes.showImage}/>
            </div>
        )
    }
    return(
        <div className={classes.mainInline}>
        {/*<button onClick={() => props.deleteImage({image : props.src,user_name : props.user_name})}>delete</button>*/}
        <h3 className={classes.date}>{props.date}</h3>
        <img src={isSrc} alt="" className={classes.image} onClick={() => props.getShow(props.index) }
             onContextMenu={test}  ref={image} onBlur={props.clearMenu} tabIndex={'0'}
        />
        {+props.chosen==1 && <h4 className={classes.mainChosen}></h4>}
        </div>
    )
}
const ImagePreloader = function(){
    return(
        <div className={classes.preloader}></div>
    )
}
const NoImages = function(props){
    if (props.chosen){
        return(
            <div className={classes.noImagesMainChosen}>
                <h2 className={classes.noImagesTitleChosen}>
                    So far, there is nothing here. Time to add chosen pictures!</h2>
                <div className={classes.noImagesChosen}></div>
            </div>
        )
    }
    return(
        <div className={classes.noImagesMain}>
            <h2 className={classes.noImagesTitle}>
                So far, there is nothing here. Time to add pictures!</h2>
        <div className={classes.noImagesImage}></div>
        </div>
    )
}

let state = function(state){
    return{
        images : state.login.images,
        user_name : state.login.user_name,
        isChosen : state.login.others.chosen
    }
}

export default connect(state,{deleteImage,toggleChosen})(Photos);