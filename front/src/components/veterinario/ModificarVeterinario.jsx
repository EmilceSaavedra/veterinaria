import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaIdCard, FaPhone, FaGraduationCap, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import { consultaEspecialidades } from "../../service/Especialidades.services";
import './Veterinarios.css';

export default function ModificarVeterinarioForm({ veter, cerrarVentanaModificacion, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [especialidades, setEspecialidades] = useState([]);
    const [matricula, setMatricula] = useState(veter.matricula.slice(1));
    
    // Formatear la fecha actual para el límite máximo
    const today = new Date().toISOString().split('T')[0];
    
    // Formatear la fecha inicial del veterinario
    const fechaInicial = veter.fechaRegistro ? 
        new Date(veter.fechaRegistro).toISOString().split('T')[0] : 
        '';
    
    // Cargar especialidades al montar el componente
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

    // Función para manejar el envío del formulario
   // ModificarVeterinario.jsx// ModificarVeterinario.jsx
   const onSubmitForm = async (data) => {
    try {
        const datosParaEnviar = {
            legajo: veter.legajo,
            nombre: `${data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1)} ${data.apellido.charAt(0).toUpperCase() + data.apellido.slice(1)}`,
            matricula: `M${matricula}`,
            fechaRegistro: data.fechaRegistro, // Ya viene en formato YYYY-MM-DD del input date
            celular: parseInt(data.celular, 10),
            idEspecialidad: parseInt(data.idEspecialidad, 10)
        };

        await onSubmit(datosParaEnviar);
        cerrarVentanaModificacion();
    } catch (error) {
        console.error("Error al modificar:", error);
    }
};

return (
    <div className="modificar-container">
        <div className="modificar-card">
            <form onSubmit={handleSubmit(onSubmitForm)} className="modificar-form">
                <h2 className="form-title">
                    <FaEdit className="title-icon" />
                    Modificar Veterinario
                </h2>

                <div className="form-group">
                    <label>
                        <FaIdCard className="input-icon" />
                        Legajo:
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        value={veter.legajo}
                        {...register("legajo")}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>
                        <FaUser className="input-icon" />
                        Apellido:
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                        defaultValue={veter.nombre.split(" ")[1]}
                        {...register("apellido", { required: true, minLength: 3 })}
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
                        defaultValue={veter.nombre.split(" ")[0]}
                        {...register("nombre", { required: true, minLength: 3 })}
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
                            placeholder="xxxx"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        <FaCalendarAlt className="input-icon" />
                        Fecha de Registro:
                    </label>
                    <input
                        type="date"
                        className={`form-control ${errors.fechaRegistro ? 'is-invalid' : ''}`}
                        max={today}
                        defaultValue={fechaInicial}
                        {...register("fechaRegistro", {
                            required: "La fecha de registro es requerida",
                            validate: value => {
                                const fecha = new Date(value);
                                const hoy = new Date();
                                hoy.setHours(0, 0, 0, 0);
                                return fecha <= hoy || "No se pueden seleccionar fechas futuras";
                            }
                        })}
                    />
                    {errors.fechaRegistro && (
                        <div className="error-message">
                            {errors.fechaRegistro.message}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        <FaPhone className="input-icon" />
                        Celular:
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                        defaultValue={veter.celular}
                        {...register("celular", { required: true, pattern: /^\d{10}$/ })}
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
                        defaultValue={veter.idEspecialidad || ""}
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
                        Guardar cambios
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cerrarVentanaModificacion}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
);  
};