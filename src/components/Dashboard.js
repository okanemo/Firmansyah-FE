import React, { Component } from 'react';
import Api from '../axios/Api';
import User from './User';
import BookDash from './BookDash';
import Navbar from './Navbar';

export class Dashboard extends Component {

    state = {
        users: [],
        books: [],
        errMsg: null,
        userTerpilih: null,
        role: null,
        table: 'user',
        judul: '',
        pengarang: '',
        tahun: '',
        penerbit: '',
        sinopsis: '',
    }

    componentDidMount() {
        this.getUsers();
        this.getBooks();
    }

    userDipilih = (user, role) => {
        this.setState({
            userTerpilih: user,
            role: role
        })
    }

    changeTableUser = () => {
        this.setState({ table: 'user' })
    }

    changeTableBook = () => {
        this.setState({ table: 'book' })
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    dataBuku = () => {
        const { judul, pengarang, tahun, penerbit, sinopsis} = this.state;
        return {
            judul,
            pengarang,
            tahun,
            penerbit,
            sinopsis
        }
    }

    // Books API
    getBooks = () => {
        Api.get('/book/all', { headers: { 'auth-token': localStorage.getItem('token') } })
            .then(response => this.setState({ books: response.data }))
            .catch(error => this.setState({ errMsg: error.response.data }))
    }

    addBook = () => {
        Api.post('/book/add', this.dataBuku(), { headers: { 'auth-token': localStorage.getItem('token') } })
        .then(response => console.log(response))
        .catch(error => console.log(error.response))
    }

    // Users API
    getUsers = () => {
        Api.get('/user/all', { headers: { 'auth-token': localStorage.getItem('token') } })
            .then(response => this.setState({ users: response.data }))
            .catch(error => this.setState({ errMsg: error.response.data }));
    }

    editUsers = () => {
        Api.put('user/' + this.state.userTerpilih, { role: this.state.role }, { headers: { 'auth-token': localStorage.getItem('token') } })
            .then(response => console.log(response))
            .catch(error => console.log(error.response));
    }

    deleteUsers = () => {
        Api.delete('/user/' + this.state.userTerpilih, { headers: { 'auth-token': localStorage.getItem('token') } })
            .then(response => this.getUsers())
            .catch(error => console.log(error.response));
    }

    render() {
        const listUser = this.state.users.map(item => {
            return <User key={item._id} user={item} userDipilih={this.userDipilih} />
        });

        const listBook = this.state.books.map(item => {
            return <BookDash key={item._id} book={item} bukuDipilih={this.bukuDipilih} />
        })

        const table = this.state.table === 'user' ? <>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser}
                    </tbody>
                </table>
            </div>

            {/* Edit Modals */}
            <div className="modal" id="myEditModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure to edit this data?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.editUsers}>Yes</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modals */}
            <div className="modal" id="myDeleteModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure to delete this data?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.deleteUsers}>Yes</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
            :
            <>
            <button type="button" className="btn btn-primary mb-2 mt-4" data-toggle="modal" data-target="#myModalAddBook">Add Book</button>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Pengarang</th>
                                <th>Tahun</th>
                                <th>Penerbit</th>
                                <th>Sinopsis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listBook}
                        </tbody>
                    </table>
                </div>

                {/* Modals Add */}
                <div className="modal" id="myModalAddBook">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Book</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="judul" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Pengarang</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="pengarang" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Tahun</label>
                                <div className="col-sm-6">
                                    <input type="number" defaultValue="2000" className="form-control" name="tahun" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Penerbit</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="penerbit" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Sinopsis</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="sinopsis" onChange={this.handlerChange} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <input type="submit" name="add" value="Add" className="btn btn-primary" onClick={this.addBook} data-dismiss="modal" />
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            </>

        return (
            this.state.errMsg ?
                <div className="container">
                    <h1>{this.state.errMsg}</h1>
                </div>
                :
                <>
                    <Navbar />
                    <div className="container">
                        <h1>Dashboard</h1>
                        <div className="card-deck">
                            <div className="card bg-danger text-white mt-5" onClick={this.changeTableUser}>
                                <div className="card-body">
                                    <h4 className="card-title mb-4">User</h4>
                                    <h2 className="card-subtitle mb-2 text-white">{this.state.users.length}</h2>
                                </div>
                            </div>
                            <div className="card bg-info text-white mt-5" onClick={this.changeTableBook}>
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Book</h4>
                                    <h2 className="card-subtitle mb-2 text-white">{this.state.books.length}</h2>
                                </div>
                            </div>
                        </div>
                        <br />

                        {table}
                    </div>
                </>
        )
    }
}

export default Dashboard
