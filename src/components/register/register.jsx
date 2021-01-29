import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {registerTC as register} from './../../reducers/login_reducer';
import {NavLink, Redirect} from "react-router-dom";
import {Input} from "../others/inputs/inputs";
import {inputVal} from "../../validator";
import classes from './../login/login.module.css';

const Register = function(props){
    if (props.user_name){
        return <Redirect to={'/photos'} />
    }
    return(
    <RegisterFormC onSubmit={props.register}/>
    )
}

const RegisterForm = function (props){
    return(

    <form onSubmit={props.handleSubmit}>
        <div className={classes.loginBlock}>
            <h1 className={classes.title+' '+classes.titleFirst}>Register</h1>
            <h4 className={classes.inputTitle}>Name:</h4>
            <Field component={Input} name={'user_name'} validate={inputVal} maxLength={'15'}
                   className={classes.input} autoComplete={'off'} placeholder={'Name'}/>
            <h4 className={classes.inputTitle}>Password:</h4>
            <Field component={Input} name={'password'} validate={inputVal} maxLength={'15'} maxLength='15'
                   className={classes.input} autoComplete={'off'} placeholder={'Password'}/>
            <NavLink to={'/login'} className={classes.back}>Login</NavLink>
            <button  className={classes.registerButton}>Register</button>
            <span className={classes.error}>{props.error}</span>
        </div>
    </form>
    )
}


const RegisterFormC = reduxForm({
    form : 'register'
})(RegisterForm)

let state=function(state){
    return{
        user_name : state.login.user_name,
        password : state.login.password
    }
}



export default connect(state,{register})(Register);