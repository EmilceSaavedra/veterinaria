import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaUserPlus } from 'react-icons/fa'; // Importar iconos
import "react-toastify/dist/ReactToastify.css";
import ListadoVeterinarios from "./ListadoVeterinarios";
import RegistrarVeter from "./RegistrarVeterinario";
import ModificarVeterinario from "./ModificarVeterinario";
import { alta, baja, modificacion, consulta, buscarVeterinariosPorNombre } from "../../service/Veterinarios.Services.js";
import './Veterinarios.css';// Crear este archivo para los estilos

export default function Veterinarios() {
    const { register, handleSubmit, reset } = useForm();
    const [lista, setLista] = useState([]);
    const [veterSeleccionado, setVeterSeleccionado] = useState(null);
    const [mensajeBusqueda, setMensajeBusqueda] = useState("");
    const [vistaActiva, setVistaActiva] = useState("lista"); // Estados: "lista", "registro", "modificacion"

    useEffect(() => {
        if (vistaActiva === "lista") {
            cargarVeterinarios();
        }
    }, [vistaActiva]);

    const cargarVeterinarios = async () => {
        try {
            const res = await consulta({});
            setLista(res.data);
            setMensajeBusqueda("");
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await buscarVeterinariosPorNombre(data.legajo);
            if (res.veterinarios.length > 0) {
                setLista(res.veterinarios);
                setMensajeBusqueda("");
            } else {
                setMensajeBusqueda("No se encontró ningún veterinario con ese legajo.");
                setLista([]);
            }
        } catch (error) {
            console.error(error);
            setMensajeBusqueda("Error en la búsqueda.");
        } finally {
            reset();
        }
    };

    const registrar = async (data) => {
        await alta(data);
        setVistaActiva("lista");
        cargarVeterinarios();
    };

    const modificar = async (data) => {
        try {
            await modificacion(data);
            toast.success("Veterinario modificado correctamente");
            setVistaActiva("lista");
            cargarVeterinarios();
        } catch (error) {
            console.error("Error al modificar:", error);
            toast.error("Error al modificar el veterinario.");
        }
    };

    const borrar = async (legajo) => {
        await baja(legajo);
        cargarVeterinarios();
    };
    return (
        <div className="container veterinarios-container">
            <h1 className="text-center mb-4">Gestión de Veterinarios</h1>
            <hr className="mb-4" />
            {vistaActiva === "lista" && (
                <>
                    <div className="card search-card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="search-form">
                                <h2 className="form-title text-center mb-4">
                                    <FaSearch className="me-2" />
                                    Buscar Veterinario
                                </h2>
                                <hr className="mb-4" />
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="form-floating mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="legajoInput"
                                                placeholder="Ingrese legajo"
                                                {...register("legajo")}
                                            />
                                            <label htmlFor="legajoInput">Nombre o Apellido</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                    >
                                        <FaSearch className="me-2" />
                                        Buscar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success btn-lg"
                                        onClick={() => setVistaActiva("registro")}
                                    >
                                        <FaUserPlus className="me-2" />
                                        Agregar Veterinario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {mensajeBusqueda && (
                        <div className="alert alert-warning mt-3" role="alert">
                            {mensajeBusqueda}
                        </div>
                    )}
                    {lista.length > 0 && (
                        <div className="mt-4">
                            <ListadoVeterinarios
                                lista={lista}
                                borrar={borrar}
                                abrirVentanaModificacion={(veter) => {
                                    setVeterSeleccionado(veter);
                                    setVistaActiva("modificacion");
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            {vistaActiva === "registro" && (
                <RegistrarVeter
                    cerrarVentanaRegistrar={() => setVistaActiva("lista")}
                    alta={registrar}
                />
            )}

            {vistaActiva === "modificacion" && (
                <ModificarVeterinario
                    veter={veterSeleccionado}
                    onSubmit={modificar}
                    cerrarVentanaModificacion={() => setVistaActiva("lista")}
                />
            )}

            <ToastContainer />
        </div>
    );
}
