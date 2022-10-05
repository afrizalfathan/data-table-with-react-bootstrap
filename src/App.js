import Nav from "./components/Nav"
import "./style/style.css"
import { React, useState } from "react"
import { Button, Modal, Form, Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import DataTable from "./components/DataTable"
import { useEffect } from "react"

function App() {
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(mahasiswa))
    })

    function getDataFromLocalStorage() {
        const dataMhs = localStorage.getItem("data")
        if (dataMhs) {
            return JSON.parse(dataMhs)
        } else {
            return []
        }
    }

    const [nama, setNama] = useState("")
    const [npm, setNpm] = useState("")
    const [alamat, setAlamat] = useState("")
    const [telepon, setTelepon] = useState("")
    const [edit, setEdit] = useState("")
    const [mahasiswa, setMahasiswa] = useState(getDataFromLocalStorage())
    const [nomor, setNomor] = useState(1)
    const [show, setShow] = useState(false)
    const [tambah, setTambah] = useState("Tambah Data")
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({})

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    // Fungsi menghapus data
    function deleteHandler(siswaId) {
        const filteredSiswa = mahasiswa.filter(
            (siswa) => siswa.id !== siswaId,
            setNomor(nomor - 1)
        )
        setMahasiswa(filteredSiswa)
    }

    // fungsi untuk memasukan data dalam field untuk pengecekan form
    function findFormErrors() {
        const newErrors = {}
        if (!nama || nama === "") newErrors.nama = "Nama tidak boleh kosong!"
        if (!npm || npm === "") newErrors.npm = "NPM tidak boleh kosong!"
        if (!telepon || telepon === "")
            newErrors.telepon = "Telepon tidak boleh kosong!"
        if (!alamat || alamat === "")
            newErrors.alamat = "Alamat tidak boleh kosong!"

        return newErrors
    }

    // Fungsi untuk mengerate data key
    function generateKey() {
        return Date.now()
    }

    //fungsi menyimpan data
    function saveData(e) {
        e.preventDefault()
        const newErrors = findFormErrors()

        // kondisi jika suatu form kosong
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {
            setValidated(true)
            if (edit.id) {
                const newData = {
                    id: edit.id,
                    nama,
                    npm,
                    alamat,
                    telepon,
                }

                const editSiswaIndex = mahasiswa.findIndex(
                    (siswa) => siswa.id === edit.id
                )

                const updatedData = [...mahasiswa]

                updatedData[editSiswaIndex] = newData
                setMahasiswa(updatedData)

                return cancelEditHandler()
            }

            setMahasiswa([
                ...mahasiswa,
                {
                    id: generateKey(),
                    nama,
                    npm,
                    alamat,
                    telepon,
                },
            ])
            setTambah("Tambah Data")
            setNama("")
            setNpm("")
            setAlamat("")
            setTelepon("")
            handleClose()
        }
    }

    // fungsi jika tombol tambah diklik
    function handleModalShow() {
        handleShow()
        setTambah("Tambah Data")
        setNama("")
        setNpm("")
        setAlamat("")
        setTelepon("")
    }

    // fungsi jika tombol edit diklik

    function editHandler(siswa) {
        handleShow()
        setEdit(siswa)
        setTambah("Edit Data")
        setNama(siswa.nama)
        setNpm(siswa.npm)
        setAlamat(siswa.alamat)
        setTelepon(siswa.telepon)
    }

    // fungsi jika tombol close edit diklik

    function cancelEditHandler() {
        setEdit({})
        setNama("")
        setNpm("")
        setAlamat("")
        setTelepon("")
        handleClose()
    }

    return (
        <div className="App">
            <Nav />
            <div className="form-create">
                <Button
                    variant="primary"
                    className="mt-5"
                    onClick={handleModalShow}
                >
                    Tambah <FontAwesomeIcon icon={faCirclePlus} />
                </Button>
                {/* Modal dan form */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{tambah}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated}>
                            <Form.Group className="mb-3 mt-3" role="form">
                                <Form.Label>Nama : </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama..."
                                    onChange={(e) => setNama(e.target.value)}
                                    value={nama}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Kolom nama wajib diisi!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>NPM : </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan NPM..."
                                    onChange={(e) => setNpm(e.target.value)}
                                    value={npm}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Kolom npm wajib diisi!
                                </Form.Control.Feedback>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Alamat : </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Masukkan alamat..."
                                        onChange={(e) =>
                                            setAlamat(e.target.value)
                                        }
                                        value={alamat}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Kolom alamat wajib diisi!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Nomor Telepon : </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Masukkan nomor telepon..."
                                        onChange={(e) =>
                                            setTelepon(e.target.value)
                                        }
                                        value={telepon}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Kolom telepon wajib diisi!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {edit.id ? (
                            <Button
                                variant="secondary"
                                onClick={cancelEditHandler}
                            >
                                Close Edit
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        )}
                        <Button variant="success" onClick={saveData}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>NPM</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Telp</th>
                        <th>Pilihan</th>
                    </tr>
                </thead>
                {mahasiswa.map((siswa) => (
                    <DataTable
                        key={siswa.id}
                        mahasiswa={siswa}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                    ></DataTable>
                ))}
            </Table>
        </div>
    )
}

export default App
