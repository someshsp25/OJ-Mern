import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./LoginSignup.css";

export const SignUp = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
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
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody,
            });

            if (response.ok) {
                const data = await response.json();
                setUser({username:"", email:"", phone: "",password:""});

                // stored the token in local storage
                console.log(data.token);
                storeTokenInLS(data.token);
                

                console.log(data);
                setMessage(data.msg);
                navigate("/question");
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || 'Registration failed');
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
                    <div className='text'>Sign Up</div>
                    <div className='underline'></div>
                </div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <div className='input'>
                            <img src='/images/person.png' alt='user icon' />
                            <input
                                type="text"
                                name="username"
                                placeholder='Username'
                                id="username"
                                autoComplete="off"
                                required
                                value={user.username}
                                onChange={handleInput}
                            />
                        </div>
                        <div className='input'>
                            <img src='/images/email.png' alt='email icon' />
                            <input
                                type='email'
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
                            <img src='/images/person.png' alt='user icon' />
                            <input
                                type='number'
                                placeholder='Phone Number'
                                required
                                id="phone"
                                name="phone"
                                autoComplete="off"
                                value={user.phone}
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
                                <div className="submit">Sign-Up</div>
                            </button>
                            <div className="submit gray">
                                <NavLink to="/">Login</NavLink>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
