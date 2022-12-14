import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth";
import {clearMessage} from "../../redux/client";
import {useNavigate, Navigate} from 'react-router-dom';
import {LanguageContext} from "../../languages";
import Spinner from 'react-bootstrap/Spinner';
import './Login.scss';

function App() {
    const {error_message, loader}  = useSelector(state => state.client);

    const token  = localStorage.getItem('authToken')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lang = React.useContext(LanguageContext);


        useEffect(() => {
            console.log('message');
            console.log(error_message);
            return () => {
                setTimeout(() => {
                    dispatch(clearMessage())
                }, 5000)
            }
        }, [error_message,dispatch])

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [validations, setValidations] = useState({
        email: '',
        password: ''
    })

    const validateAll = () => {
        const { email, password } = values
        const validations = { name: '', email: '', gender: '' }
        let isValid = true

        if (!email) {
            validations.email = 'Email is required'
            isValid = false
        }

        if (!password) {
            validations.password = 'Password is required'
            isValid = false
        }

        if (email && !/\S+@\S+\.\S+/.test(email)) {
            validations.email = 'Email format must be as example@mail.com'
            isValid = false
        }

        if (!isValid) {
            setValidations(validations)
        }

        return isValid
    }
    const validateOne = (e) => {
        const { name } = e.target
        const value = values[name]
        let message = ''

        if (!value) {
            message = `${name} is required`
        }

        if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            message = 'Email format must be as example@mail.com'
        }

        setValidations({...validations, [name]: message })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = validateAll()

        if (!isValid || loader) {
            return false
        }
        values.history = navigate
        dispatch(login(values))
    }

    const { email, password } = values
    const {
        email: emailVal,
        password: passwordVal
    } = validations

    if(token){
        return <Navigate replace to="/" />
    }else {
        return (
            <>
            <div className={'ml-3 font-weight-bold'} style={{position:'fixed'}}>
                MyRestaurant
            </div>
            <div className="login-wrapper d-flex justify-content-center align-items-center flex-column h-100  container">
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper d-flex flex-column"  style={ emailVal ? { border:'1px solid var(--et-red)'} : {border:'none'}}>
                        <label>Email:</label>
                        <input
                            className="input-login"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={validateOne}
                        />
                    </div>
                    <div className={`error ${emailVal ? 'mt-1 mb-2 ' : ''}`}>{emailVal}</div>

                    <div className="input-wrapper d-flex flex-column mt-3"  style={ passwordVal ? { border:'1px solid var(--et-red)'} : {border:'none'}}>
                        <label>{lang.pass}:</label>
                        <input
                            className="input-login"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={validateOne}
                        />
                    </div>
                    <div className={`error ${passwordVal ? 'mt-1 mb-2 ' : ''}`}>{passwordVal}</div>
                    <button type="submit" className="mt-3 w-100 d-flex blackbox justify-content-center align-items-center">
                        Login {loader &&    <Spinner animation="border" className="ml-2" variant="light"  size="sm"/>}
                    </button>
                    <div className={"error p-2 text-center"}>
                        {error_message}
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default App;
