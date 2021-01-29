import {reduxForm,Field} from "redux-form";
import {connect} from "react-redux";
import {loginTC as login} from './../../reducers/login_reducer';
import {NavLink, Redirect} from 'react-router-dom';
import {Input} from "../others/inputs/inputs";
import {inputVal} from "../../validator";
import classes from './login.module.css';

const Login = function(props){
    if (props.user_name){
        return <Redirect to={'/photos'} />
    }
    function login(data){
        props.login(data);
    }
    return <LoginFormC onSubmit={login}/>
}
const LoginForm = function(props){
    return(
    <form onSubmit={props.handleSubmit}>
        <div className={classes.loginBlock}>

            <h1 className={classes.title+' '+classes.titleFirst}>Hello.</h1>
            <h1 className={classes.title}>Welcome back</h1>
            <h4 className={classes.inputTitle}>Name:</h4>
            <Field component={Input} name={'user_name'} validate={inputVal} maxLength={'15'}
            className={classes.input} placeholder={'Name'} autoComplete={'off'}/>
            <h4 className={classes.inputTitle}>Password:</h4>
            <Field component={Input} name={'password'} validate={inputVal}
                   maxLength={'15'}    className={classes.input} placeholder={'Password'}
                   autoComplete={'off'}/>
            <NavLink to={'/register'} className={classes.back}>Register</NavLink>
            <button className={classes.loginButton}>Login</button>
            <span className={classes.error}>{props.error}</span>
        </div>
    </form>
    )
}

const LoginFormC = reduxForm({
    form : 'login'
})(LoginForm)

let state=function(state){
    return{
        user_name : state.login.user_name,
        password : state.login.password
    }
}



export default connect(state,{login})(Login);