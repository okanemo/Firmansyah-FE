import React from 'react';
import Buku from './Buku';

const DaftarBuku = ({daftarBuku, bukuDipilih}) => {
    const buku = daftarBuku.map((result) => {
        return(
            <Buku bukuDipilih={bukuDipilih} key={result._id} buku={result} />
        )
    })

    return(
        <div>
            {buku}
        </div>
    );
}

export default DaftarBuku;