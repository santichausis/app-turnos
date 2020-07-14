import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled'

const MensajeError = styled.section`
    background-color: #fa3a2f;
    color: #f1f1f1;
    padding: 1rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1em;
`

const Formulario = ({crearCita}) => {


    // Crear State de Citas

    const[cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    // Función que se ejecuta cada vez que el usuario escribe en un input

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Función que se ejecuta cuando hay error
    const [error, actualizarError] = useState(false)


    // Extraer los valores

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona enviar cita

    const submitCita = e => {
        e.preventDefault();

        // Validar 

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)
            return;
        }
        //Eliminar mensaje previo
        actualizarError(false)

        // Asignar un ID
        cita.id = uuidv4();

        // Crear cita
        crearCita(cita)

        // Reiniciar form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <MensajeError>Todos los campos son obligatorios</MensajeError> : null }
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota:</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño:</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del propietario"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora:</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas:</label>
                <textarea
                    type="text"
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                />
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita
                </button>
            </form>
        </Fragment>
    )
}

export default Formulario;