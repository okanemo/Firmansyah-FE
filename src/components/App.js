import React, { Component } from 'react'
import DaftarBuku from './DaftarBuku';
import DetailBuku from './DetailBuku';
import Api from '../axios/Api';
import Navbar from './Navbar';

export class App extends Component {
  state = {
    daftarBuku: [],
    bukuTerpilih: null,
    errMsg: null,
    currentUser: null,
  }

  componentDidMount() {
    //Check user has token
    if (localStorage.getItem('token') === null)
      return this.props.history.push('/login');
    this.getBook();
  }

  bukuDipilih = (buku) => {
    this.setState({
      bukuTerpilih: buku
    })
  }

  getBook = () => {
    Api.get('/book/all', { headers: { 'auth-token': localStorage.getItem('token') } })
      .then(response => this.setState({ daftarBuku: response.data }))
      .catch(error => this.setState({ errMsg: error.response.data }))
  }

  render() {

    return (
      this.state.errMsg ?
        <div className="container">
          <h1>{this.state.errMsg}</h1>
        </div>
        :
        <>
          <Navbar />
          <div className="container">
            <h1>Daftar Buku</h1>
            <div className="row">
              <div className="col-lg-7">
                <DaftarBuku bukuDipilih={this.bukuDipilih} daftarBuku={this.state.daftarBuku} />
              </div>
              <div className="col-lg-5">
                <DetailBuku bukuTerpilih={this.state.bukuTerpilih} />
              </div>
            </div>
          </div>
        </>
    )
  }
}

export default App
