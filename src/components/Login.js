import React, { Component } from 'react';
import Api from '../axios/Api';

export class Login extends Component {

    state = {
        email: '',
        password: '',
        errMsg: null
    }

    componentDidMount() {
        //Check user has token
        if (localStorage.getItem('token') !== null)
        return this.props.history.push('/');
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlerSubmit = async (e) => {
        const { email, password } = this.state;
        e.preventDefault();

        this.setState({
            email: '',
            password: ''
        })

        await Api.post('user/login', {email, password})
        .then(response => {
            localStorage.setItem("token", response.data.token);
            if (response.data.role === 'admin') {
                this.props.history.push('/dashboard', {name: response.data.name});
            } else {
                this.props.history.push('/', {name: response.data.name});
            }
        })
        .catch(error => this.setState({errMsg: error.response.data}));
    }

    render() {
        const showErr = this.state.errMsg ? <div class="alert alert-danger" role="alert">
        {this.state.errMsg}
      </div> : <></>
        return (
            <div className="container p-5">
                <form onSubmit={this.handlerSubmit} className="p-5">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={this.state.email} className="form-control" name="email" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} className="form-control" name="password" onChange={this.handlerChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="form-group">
                    <br />
                        {showErr}
                        <p>Don't have an account? <a href="register">Register</a></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
