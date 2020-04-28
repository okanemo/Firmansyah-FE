import React, { Component } from 'react';
import Api from '../axios/Api';

export class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        repassword: '',
        errMsg: null,
        successMsg: null,
    }

    componentDidMount() {
        //Check user has token
        if (localStorage.getItem('token') !== null)
        return this.props.history.push('/');
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlerSubmit = (e) => {
        const { name, email, password, repassword } = this.state;
        e.preventDefault();

        this.setState({
            name: '',
            email: '',
            password: '',
            repassword: ''
        })

        // Check password
        if (password !== repassword) return this.setState({ errMsg: 'password not match' });

        Api.post('user/register', { name, email, password })
            .then(respone => this.setState({ errMsg: null, successMsg: 'User successfully created' }))
            .catch(error => this.setState({ errMsg: error.response.data }))
    }

    render() {
        const showErr = this.state.errMsg ? <div class="alert alert-danger" role="alert">
            {this.state.errMsg}
        </div> : <></>
        const showSuccess = this.state.successMsg ? <div class="alert alert-success" role="alert">
            {this.state.successMsg}
        </div> : <></>
        return (
            <div className="container p-5">
                {showSuccess}
                <form onSubmit={this.handlerSubmit} className="p-5">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={this.state.email} name="email" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Retype Password</label>
                        <input type="password" className="form-control" value={this.state.repassword} name="repassword" onChange={this.handlerChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    <div className="form-group">
                        <br />
                        {showErr}
                        <p>Have an account? <a href="login">Sign In</a></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register
