import classes from './about.module.css';
import {NavLink} from "react-router-dom";


const About = function(){
    return (
        <div className={classes.main}>
        <NavLink to={'/photos'}><div className={classes.arrow}></div></NavLink>
        <h1 className={classes.title}>
            Project made by Gearonix. Developed with React.

            Gearonix Photos 2020</h1>
        <div className={classes.image}></div>
        </div>
    )
}
export default About