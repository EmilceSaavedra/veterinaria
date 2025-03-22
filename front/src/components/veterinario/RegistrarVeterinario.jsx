import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaIdCard, FaPhone, FaGraduationCap, FaUserMd } from 'react-icons/fa';
import { consultaEspecialidades } from "../../service/Especialidades.services";
import './Veterinarios.css';
export default function RegistrarVeterinario({ ventanaRegistrarRef, cerrarVentanaRegistrar, alta }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [especialidades, setEspecialidades] = useState([]);
    const [matricula, setMatricula] = useState("");

    // Cargar especialidades desde el servicio
    useEffect(() => {
        const obtenerEspecialidades = async () => {
            try {
                const response = await consultaEspecialidades();
                setEspecialidades(response.data);
            } catch (error) {
                console.error("Error al cargar especialidades:", error);
            }
        };
        obtenerEspecialidades();
    }, []);

    const onSubmit = async (data) => {
        const nombreFormateado = `${data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1)} ${data.apellido.charAt(0).toUpperCase() + data.apellido.slice(1)}`;
        data.nombre = nombreFormateado;
        data.matricula = `M${matricula}`;
    
        try {
            await alta(data);  // Llama a la función de alta en el backend
            alert(`El Legajo ${data.legajo} ha sido creado con éxito`);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);  // Muestra el mensaje de error del backend
            } else {
                alert("Ocurrió un error al intentar crear el veterinario.");
            }
        }
    };
    
    return (
        <div className="registro-container">
            <div className="registro-card">
                <form onSubmit={handleSubmit(onSubmit)} className="registro-form">
                    <h2 className="form-title">
                        <FaUserMd className="title-icon" />
                        Registrar Veterinario
                    </h2>
    
                    <div className="form-group">
                        <label>
                            <FaIdCard className="input-icon" />
                            Legajo:
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.legajo ? 'is-invalid' : ''}`}
                            {...register("legajo", { required: true, pattern: /^\d{5}$/ })}
                            placeholder="12345"
                        />
                        {errors.legajo && (
                            <div className="error-message">El legajo debe tener exactamente 5 dígitos numéricos.</div>
                        )}
                    </div>
    
                    <div className="form-group">
                        <label>
                            <FaUser className="input-icon" />
                            Apellido:
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                            {...register("apellido", { required: true, minLength: 3 })}
                            placeholder="Ingrese apellido"
                        />
                        {errors.apellido && (
                            <div className="error-message">El apellido debe tener al menos 3 caracteres.</div>
                        )}
                    </div>
    
                    <div className="form-group">
                        <label>
                            <FaUser className="input-icon" />
                            Nombre:
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            {...register("nombre", { required: true, minLength: 3 })}
                            placeholder="Ingrese nombre"
                        />
                        {errors.nombre && (
                            <div className="error-message">El nombre debe tener al menos 3 caracteres.</div>
                        )}
                    </div>
    
                    <div className="form-group">
                        <label>
                            <FaIdCard className="input-icon" />
                            Matrícula:
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">M</span>
                            <input
                                type="text"
                                className={`form-control ${errors.matricula ? 'is-invalid' : ''}`}
                                value={matricula}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setMatricula(value);
                                    }
                                }}
                                placeholder="1234"
                            />
                        </div>
                    </div>
    
                    <div className="form-group">
                        <label>
                            <FaPhone className="input-icon" />
                            Celular:
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                            {...register("celular", { required: true, pattern: /^\d{10}$/ })}
                            placeholder="1234567890"
                        />
                        {errors.celular && (
                            <div className="error-message">El celular debe contener exactamente 10 dígitos numéricos.</div>
                        )}
                    </div>
    
                    <div className="form-group">
                        <label>
                            <FaGraduationCap className="input-icon" />
                            Especialidad:
                        </label>
                        <select
                            className={`form-control ${errors.idEspecialidad ? 'is-invalid' : ''}`}
                            {...register("idEspecialidad", { required: "Debe seleccionar una especialidad" })}
                        >
                            <option value="">Seleccione una especialidad</option>
                            {especialidades.map((especialidad) => (
                                <option key={especialidad.id} value={especialidad.id}>
                                    {especialidad.tipo}
                                </option>
                            ))}
                        </select>
                        {errors.idEspecialidad && (
                            <div className="error-message">{errors.idEspecialidad.message}</div>
                        )}
                    </div>
    
                    <div className="button-group">
                        <button type="submit" className="btn btn-success">
                            Guardar
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cerrarVentanaRegistrar}>
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );    
};
