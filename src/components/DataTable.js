import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { React, useState } from "react";

const DataTable = ({ mahasiswa, deleteHandler, editHandler }) => {
    return (
        <tbody>
            <tr>
                <td>{mahasiswa.npm}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.alamat}</td>
                <td>{mahasiswa.telepon}</td>
                <td>
                    <Button
                        variant="success"
                        onClick={editHandler.bind(this, mahasiswa)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={deleteHandler.bind(this, mahasiswa.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </tbody>
    );
};

export default DataTable;
