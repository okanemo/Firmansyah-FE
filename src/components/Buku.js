import React from 'react';

const Buku = ({ buku, bukuDipilih }) => {
    const onClickHandler = () => {
        bukuDipilih(buku);
    }

    return (
        <div className="list-group-item" onClick={onClickHandler} style={{cursor:"pointer"}}>
            <h2>{buku.judul}</h2>
            <p>{buku.pengarang}</p>
        </div>
    )
}

export default Buku;