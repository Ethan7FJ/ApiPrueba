import React, { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Input
} from "@heroui/react";

const DBConsulta = ({ cambioPrincipal }) => {

    const handleRegresar = () => {
        cambioPrincipal()
    }

    const [dataDB, setDataDB] = useState([])

    useEffect(() => {
        const DBConsultar = async () => {
            const response = await api.get("/basedatos/consultar");
            setDataDB(response.data.dbData)
        }

        DBConsultar();

    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const totalPages = Math.ceil(dataDB.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return dataDB.slice(start, start + rowsPerPage);
    }, [page, dataDB]);


    /* MODAL */

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [idEdit, setIDEdit] = useState(null);
    const [nameEdit, setNameEdit] = useState(null);

    return (
        <div>
            <button onClick={handleRegresar} className="rounded-lg bg-cyan-900 text-white p-3 hover:bg-cyan-900/40 duration-300 hover:text-black">Regresar</button>

            <div className="m-5">
                <Table
                    isStriped
                    aria-label="Tabla de personajes"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={totalPages}
                                onChange={(p) => setPage(p)}
                            />
                        </div>
                    }
                >
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>SPECIE</TableColumn>
                        <TableColumn>IMAGEN</TableColumn>
                        <TableColumn>TYPE</TableColumn>
                        <TableColumn>GENDER</TableColumn>
                        <TableColumn>ORIGIN NAME</TableColumn>
                        <TableColumn>LOCATION NAME</TableColumn>
                        <TableColumn>MORE</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.species}</TableCell>
                                <TableCell>
                                    <img
                                        className="w-[80px] h-[80px] object-cover mx-auto"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.origin_name}</TableCell>
                                <TableCell>{item.location_name}</TableCell>
                                <TableCell>
                                    <button
                                        className="p-2 text-white rounded-lg bg-slate-500 duration-200 hover:bg-slate-500/40 hover:text-black"
                                        onClick={() => {
                                            onOpen();
                                            setIDEdit(item.id);
                                            setNameEdit(item.name);
                                        }}
                                    >
                                        Editar
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {isOpen && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Personaje</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Seleccionaste a {nameEdit}
                                    </p>
                                    <p>A continuacion podras editar estos cuatro campos... </p>
                                    <li>Status</li>
                                    <li>Specie</li>
                                    <li>Type</li>
                                    <li>Gender</li>

                                    <div className="m-5">
                                        <Form
                                            className="w-full max-w-xs flex flex-col gap-4"
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                let data = Object.fromEntries(new FormData(e.currentTarget));

                                                const newData = { ...data, id_edit: idEdit }
                                                try {
                                                    const response = await api.post("/editar/personaje", { newData });
                                                    alert(response.data.mensaje)
                                                    window.location.reload()
                                                } catch (error) {
                                                    console.error("Error al editar:", error);
                                                    alert("Hubo un error al editar el personaje");
                                                }
                                            }}
                                        >
                                            <Input
                                                isRequired
                                                errorMessage="Please enter a valid Status"
                                                label="Status"
                                                labelPlacement="outside"
                                                name="Status"
                                                placeholder="Enter your Status"
                                                type="text"
                                            />

                                            <Input
                                                isRequired
                                                errorMessage="Please enter a valid Specie"
                                                label="Specie"
                                                labelPlacement="outside"
                                                name="Specie"
                                                placeholder="Enter your Specie"
                                                type="text"
                                            />
                                            <Input
                                                isRequired
                                                errorMessage="Please enter a valid Type"
                                                label="Type"
                                                labelPlacement="outside"
                                                name="Type"
                                                placeholder="Enter your Type"
                                                type="text"
                                            />
                                            <Input
                                                isRequired
                                                errorMessage="Please enter a valid Gender"
                                                label="Gender"
                                                labelPlacement="outside"
                                                name="Gender"
                                                placeholder="Enter your Gender"
                                                type="text"
                                            />
                                            <div className="flex gap-2">
                                                <Button color="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )
            }

        </div>
    )
}

export default DBConsulta;