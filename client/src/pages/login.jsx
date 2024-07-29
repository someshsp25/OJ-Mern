import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./LoginSignup.css";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        var formBody = [];
        for (var property in user) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(user[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody,
            });

            if (response.ok) {
                const data = await response.json();

                // stored the token in local storage
                storeTokenInLS(data.token);

                console.log(data);
                setMessage(data.msg);
                navigate("/question");
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || 'Login failed');
            }
        } catch (error) {
            console.log(error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
                    <div className='underline'></div>
                </div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <div className='input'>
                            <img src='/images/email.png' alt='email icon' />
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                id="email"
                                autoComplete="off"
                                required
                                value={user.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className='input'>
                            <img src='/images/password.png' alt='password icon' />
                            <input
                                type='password'
                                name="password"
                                placeholder='Password'
                                required
                                id="password"
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="submit-container">
                            <button className="btn-submit">
                                <div className="submit">Login</div>
                            </button>
                            <div className="submit gray">
                                <NavLink to="/register">Sign-Up</NavLink>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
