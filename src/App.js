import './css/App.css';
import ModeloDetalle from './Components/ModalDetalle';
import DBConsulta from './Components/DBConsulta';
import React, { useEffect, useState, useMemo, Suspense } from 'react';
import api from './services/api';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Button
} from "@heroui/react";

function App() {
  const [dataApi, setDataApi] = useState([]);
  const [id, setId] = useState(null);
  /* const [estadoDetalle, setEstadoDetalle] = useState(false); */
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/conexion");
      setDataApi(response.data.personas);
    };
    getData();
  }, []);

  const totalPages = Math.ceil(dataApi.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dataApi.slice(start, start + rowsPerPage);
  }, [page, dataApi]);

  const [estadoPrincipal, setEstadoPrincipal] = useState(true);
  const [estadoDetalle, setEstadoDetalle] = useState(false);
  const [estadoDB, setEstadoDBConsulta] = useState(false);

  const verDetalle = (id) => {
    setId(id);
    setEstadoDetalle(true);
    setEstadoPrincipal(false)
  };

  const volverATabla = () => {
    setEstadoDetalle(false);
    setEstadoPrincipal(true)
    setId(null);
  };

  const verDBConsulta = () => {
    setEstadoDBConsulta(true);
    setEstadoPrincipal(false);
  }

  const volverBTabla = () => {
    setEstadoDBConsulta(false);
    setEstadoPrincipal(true)
    setId(null);
  };


  const handlePus = async (data) => {
    const response = await api.post("/añadir/info", { data });
    alert(response.data.mensaje);
    window.location.reload()
  }

  const [primerEstado, setprimerestado] = useState(true);
  const [segundoEstado, setsegundoestado] = useState(false);

  useEffect(() => {
    const estadoBotones = async () => {
      const response = await api.get("/estados");

      const first = response.data.primero[0];
      const first_status = first["primer_estado"]

      if (first_status === 1) {
        setprimerestado(true);
      } else if (first_status === 0) {
        setprimerestado(false);
      } else {
        setprimerestado(true);
      }


      const second = response.data.segundo[0];
      const second_status = second["segundo_estado"]

      if (second_status === 1) {
        setsegundoestado(true);
      } else if (second_status === 0) {
        setsegundoestado(false);
      } else {
        setsegundoestado(false);
      }

    }

    estadoBotones();

  }, [])

  return (
    <div className="m-5">
      {estadoPrincipal && (
        <div>
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
                  <TableCell>
                    <button
                      className="p-2 text-white rounded-lg bg-slate-500 duration-200 hover:bg-slate-500/40 hover:text-black"
                      onClick={() => verDetalle(item.id)}
                    >
                      Detalle
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {primerEstado && (<Button className='bg-cyan-600/50 rounded-lg' onPress={() => handlePus(dataApi)}>Almacernar</Button>)}

          {segundoEstado && (<Button onPress={() => verDBConsulta()} className='bg-cyan-600/50 rounded-lg'>Consulta DB</Button>)}

        </div>
      )}

      {estadoDetalle && (
        <Suspense fallback={<p>Cargando detalle...</p>}>
          <ModeloDetalle id={id} cambioEstado={volverATabla} />
        </Suspense>
      )}

      {estadoDB && (<Suspense fallback={<p>Cargando detalle...</p>}>
        <DBConsulta cambioEstado={volverATabla} cambioPrincipal={volverBTabla}/>
      </Suspense>
      )}

    </div>
  );
}

export default App;
