import React from 'react';

const BookDash = ({ book }) => {

    return (
        <tr>
            <td>{book.judul}</td>
            <td>{book.pengarang}</td>
            <td>{book.tahun}</td>
            <td>{book.penerbit}</td>
            <td><a href={book.sinopsis} target="_blank" rel="noopener noreferrer">{book.sinopsis}</a></td>
        </tr>
    )
}

export default BookDash;