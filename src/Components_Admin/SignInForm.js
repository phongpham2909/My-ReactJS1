import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataUtils from '../Util/DataUtils'

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Username or Password error!!!",
            email: '', password: '', logged: false

        };
        let session = this.getSession();
        if (session != null) {
            this.state.logged = true;
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }
    componentWillMount() {
        if (this.state.logged === true) {
            window.location.href = "/admin";
        }
    }
    getSession() {
        let session = window.localStorage.getItem("session");
        if (session != null) {
            return JSON.parse(session);
        }
        return null;
    }
    handleSubmit(event) {
        if (this.state.email === "" || this.state.password === "") {
            alert(this.state.message);
        }
        else {
            let userInfo = DataUtils.checkUser(this.state.email, this.state.password);
            if (userInfo != null) {
                window.localStorage.setItem("session", JSON.stringify(userInfo));
                window.location.href = "/admin"
                event.preventDefault();
            }
        }
    }
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event, 13);
        }
    }
    render() {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20" >Sign In</button> <Link to="/sign-up" className="FormField__Link">Create an account</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;