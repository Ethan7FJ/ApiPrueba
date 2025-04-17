import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Card, CardHeader, CardBody } from "@heroui/react";

const ModeloDetalle = ({ id, cambioEstado }) => {

    const [detalle, setDetalleID] = useState([])

    console.log(detalle)

    const handleRegresar = () => {
        cambioEstado()
    }

    useEffect(() => {
        const infoId = async () => {
            const response = await api.get(`/detalles/${id}`);
            setDetalleID([response.data.detalles])
        }

        infoId();

    }, [id]);

    return (
        <div>
            <button onClick={handleRegresar} className="rounded-lg bg-cyan-900 text-white p-3 hover:bg-cyan-900/40 duration-300 hover:text-black">Regresar</button>

            {detalle ? (
                <div>
                    {detalle.length > 0 ? (
                        <div className="flex items-center">
                            {detalle.map((item, index) => (
                                <Card key={index} className="border-2 border-black rounded-lg py-4 m-5 flex flex-col items-center"> 
                                    <CardHeader className="flex flex-col text-center pb-0 pt-2 px-4 ">
                                        <p className="p-3">ID: {item.id}</p>
                                        <p className="p-3 text-[20px] ">NAME: {item.name}</p>
                                        <p className="p-3">STATUS: {item.status}</p>
                                        <p className="p-3">SPECIES: {item.species}</p>
                                        <p className="p-3">TYPE: {item.type}</p>
                                        <p className="p-3">GENDER: {item.gender}</p>
                                        <div>
                                            <p className="p-3">ORIGIN NAME: {item.origin.name}</p>
                                            {/* <p>{item.origin.url}</p> */}
                                        </div>
                                        <div>
                                            <p className="p-3">LOCATION NAME: {item.location.name}</p>
                                            {/* <p>{item.location.url}</p> */}
                                        </div>
                                    </CardHeader>
                                    <CardBody className="w-[250px] h-[250px] flex items-center justify-center text-center overflow-visible py-2">
                                        <img src={item.image} alt={item.image} className="object-cover rounded-xl"/>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div>
                            No se tiene registro...
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    Caregando..
                </div>
            )}
        </div>
    )
}

export default ModeloDetalle;