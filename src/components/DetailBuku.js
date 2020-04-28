import React from 'react';

const DetailBuku = ({ bukuTerpilih }) => {
    if (!bukuTerpilih) {
        return (
            <div>DetailBuku</div>
        );
    }
    return (
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <td>Judul Buku</td>
                    <td>{bukuTerpilih.judul}</td>
                </tr>
                <tr>
                    <td>Pengarang</td>
                    <td>{bukuTerpilih.pengarang}</td>
                </tr>
                <tr>
                    <td>Tahun</td>
                    <td>{bukuTerpilih.tahun}</td>
                </tr>
                <tr>
                    <td>Penerbit</td>
                    <td>{bukuTerpilih.penerbit}</td>
                </tr>
                <tr>
                    <td>Sinopsis</td>
                    <td><a href={bukuTerpilih.sinopsis} target="_blank" rel="noopener noreferrer">{bukuTerpilih.sinopsis}</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DetailBuku;