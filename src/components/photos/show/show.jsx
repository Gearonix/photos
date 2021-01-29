import axios from "axios";
import classes from "./show.module.css";
import Slider from "react-slick";
import React from 'react';
import {useState,useEffect} from 'react';

const Show = function(props){

    let [index,openIndex] = useState(props.index);
    let [animateNavbar,openAnimateNavbar] = useState(false);
    let [deleteBlock,showDeleteBlock] = useState(false);
    let [info,showInfo] = useState(false);
    let [imageInfo,showImageInfo] = useState(false);
    let [deleteBlockMessage,showdeleteBlockMessage] = useState(null)
    useEffect(mount,[]);
    let slider = React.createRef();
    function mount(){
        const source = axios.CancelToken.source()
        if (slider?.current){
            slider.current.slickGoTo(props.index);
        }
        return function(){
            openIndex(props.index);
            showDeleteBlock(false);
            openAnimateNavbar(false);
            showInfo(false);
            source.cancel();
        }
    }
    const settings = {
        dots: window.innerWidth>=432,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            openIndex(next)
            showInfo(false);
            showImageInfo(false);
            showdeleteBlockMessage(null);
        },
        customPaging: i => (
            <div
                style={{
                    width: "6px",
                    height: "6px",
                    background: "white",
                    borderRadius: "100%",

                }}
            >
            </div>
        ),
        prevArrow: <Arrow func={() => arrowGo(false)}  whatClass={classes.prevShow} />,
        nextArrow :  <Arrow func={() => arrowGo(true)} whatClass={classes.sledShow} />
    };
    function arrowGo(bool){
        if (bool){
            slider.current.slickGoTo(index+1);
            return
        }
        slider.current.slickGoTo(index-1);
    }

    function deleteImage(){
        console.log(props)
        // return
        if (props.isChosen){
            showdeleteBlockMessage('To delete the picture go to the Main tab')
            return
        }
        props.deleteImage({image : props.elements_data[index].image,user_name : props.elements_data[index].user});
        showDeleteBlock(false);
        showInfo(false);
    }

    function openNavbar(){
        if (animateNavbar){
            return
        }
        openAnimateNavbar(true)
        setTimeout(() => {

            openAnimateNavbar(false)},3500);
    }

    let navbarClass = animateNavbar ? classes.navbar : classes.noneOpacity;

    function toggleChosen(){
        let item = props.elements_data[index];
        let bool = +item.chosen==1 ? '0' : '1';
        props.toggleChosen({image : item.image,user_name : item.user,bool : bool,isChosen : props.isChosen});
        showInfo(false);
        if (bool && props.elements_data.length==1){
            props.clear()
        }
    }

    let toggleChosenClass;
    if (!props.elements_data[index]){
        toggleChosenClass = classes.chosenShow
    }
    else{
        toggleChosenClass =  +props.elements_data[index].chosen==0 ? classes.chosenShow : classes.alreadyChosen
    }
    function showInfoBlock(){
        // debugger
        showInfo(true)
    }
    function catchImageData(){
        let item = props.elements_data[index];
        let src;
        if (item.image){
            try {
                src = require(`./../../../../backend/images/${item.image}`);
            }
            catch (error){
            }
        }
        let isSrc = props.elements_data[index].image && src && src.default;
        let title = item.image.length>14 ? item.image.slice(0,14)+'...' : item.image;
        let chosen = item.chosen==1 ? true : false;
        return {title,isSrc,chosen,user_name: item.user,date : item.date}
    }
   // console.log(props.elements_data[1])
    // let isSrc = props.elements_data[index].image && src && src.default;
    if (props.elements_data.length==0){
        props.clear()
    }
    function cancelDeleteBlock(){
        showDeleteBlock(false);
        showdeleteBlockMessage(null);
    }
    return(
        <div className={classes.showMain} onMouseMove={openNavbar}>

            <nav className={navbarClass} >
                <button onClick={props.clear} className={classes.showBack}></button>
                <div className={classes.s}>
                    <ul>
                        <li><button onClick={() => showDeleteBlock(true)} className={classes.deleteImage}></button></li>
                        <li><button className={toggleChosenClass} onClick={toggleChosen}></button></li>
                        <li><button className={classes.infoShow}  onClick={() => showImageInfo(true)}></button></li>
                        <li><button className={classes.othersShow} onClick={showInfoBlock}></button></li>
                    </ul>

                </div>
            </nav>
            {deleteBlock && <DeleteBlock delete={deleteImage} cancel={() => showDeleteBlock(false)} error={deleteBlockMessage}/>}
            {info && <Info delete={deleteImage} chosen={toggleChosen} close={showInfo} info={() => showImageInfo(true)}/>}
            {imageInfo && <ImageInfo cancel={() => showImageInfo(false)} data={catchImageData()}/>}
            <div className={classes.sliderBlock}>

                <Slider {...settings} ref={slider} >
                    {props.elements}
                </Slider>
            </div>
        </div>
    )
}

const DeleteBlock = function(props){
    return(
        <div className={classes.backBlack}>
        <div className={classes.deleteBlockMain}>
            <div className={classes.DeleteBlockimageBin}>
                <h3 className={classes.DeleteBlockbin}></h3>
            </div>
            <h2 className={classes.DeleteBlocktitle}>
                Do you want to delete image?
            </h2>
            <div className={classes.DeleteBlockbuttonBlock}>
                <button className={classes.DeleteBlockdeleteShow} onClick={props.delete}>Delete</button>
                <button className={classes.DeleteBlockcancel} onClick={props.cancel}>Cancel</button>
            </div>
            <span className={classes.deletBlockError}>{props.error}</span>
        </div>
        </div>
    )
}

const Info = function(props){
    let infoRef = React.createRef();
    function mount(){
        if (infoRef.current){
            infoRef.current.focus();
        }
    }
    useEffect(mount,[])
    return(
        <div className={classes.othermenu} tabIndex={'0'} onBlur={() => props.close(false)} ref={infoRef}>
            <ul>
                <li className={classes.otherMenudelete} onClick={props.delete}>Delete</li>
                <li className={classes.otherMenuchosen} onClick={props.chosen}>Chosen</li>
                <li className={classes.otherMenuinfo} onClick={props.info}>Info</li>
                <li className={classes.otherMenuCancel} onClick={() => props.close(false)}>Cancel</li>
            </ul>
        </div>
    )
}
const ImageInfo = function(props) {
    return (
        <div className={classes.infoBlock}>
            <div className={classes.infoBlockArrow} onClick={props.cancel}></div>
            <h3 className={classes.infoBlockTitle}>{props.data.title}</h3>
            <div className={classes.infoBlockimageBlock}>
            <img src={props.data.isSrc} alt={""} className={classes.infoBlockImage} />
            <div className={props.data.chosen ? classes.infoBlockIsChosen : null}></div>
            </div>
            <h4 className={classes.infoBlockdateTitle}>User:</h4>
            <h2 className={classes.InfoBlockDate}>{props.data.user_name}</h2>
            <h4 className={classes.infoBlockdateTitle}>Date:</h4>
            <h2 className={classes.InfoBlockDate}>{props.data.date}</h2>
        </div>
    )
}


const Arrow = function(props){
    return(
        <div className={props.whatClass} onClick={props.func}></div>
    )

}

export default Show;