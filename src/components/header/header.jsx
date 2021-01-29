import classes from './header.module.css';
import './../../normalize.css';
import {NavLink} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {addImageTC as addImage,setProfileAC as setProfile,getChosenImagesTC as getChosenImages,getImagesTC as getImages} from "../../reducers/login_reducer";
const Header = function(props){
    function addImage(event){
        if (event.target.files.length>0){
            let data = {user_name : props.user_name,file : event.target.files[0]};
            props.addImage(data);
        }
    }
    function logout(){
        props.setProfile({images : [],user_name: null,password: null});
    }
    function getImages(){
        if (props.chosen){
            props.getImages({user_name : props.user_name})
            return
        }
        props.getChosenImages({user_name : props.user_name})
    }
    return(
        <div className={classes.main}>
            <div className={classes.logo}></div>
            <nav className={classes.navbar}>
                <ul>
                    <li className={classes.chosen} onClick={getImages}><div className={classes.adaptiveChosen+' '+classes.adaptiveIcon}></div>
                        <button >{!props.chosen ? 'Chosen' : 'Main'}</button></li>
                    <li className={classes.logout} onClick={logout}><div className={classes.adaptiveLogout+' '+classes.adaptiveIcon}></div>
                        <button >Logout</button></li>
                    <li className={classes.about}><NavLink to={'/about'}><div className={classes.adaptiveAbout+' '+classes.adaptiveIcon}></div>
                        <span className={classes.adaptiveHidden}>About</span></NavLink> </li>
                    <li className={classes.download}><div className={classes.file}><input type={'file'} onChange={addImage}
                    className={classes.fileInput}/><span className={classes.adaptiveHidden}>Add Image</span></div></li>

                </ul>
            </nav>
        </div>
    )
}

let state = function(state){
    return{
        user_name : state.login.user_name,
        chosen : state.login.others.chosen
    }
}

export default connect(state, {addImage,setProfile,getChosenImages,getImages})(Header);