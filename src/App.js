import React, { Fragment, useState, useEffect } from 'react';
import Formulario from  './components/Formulario';
import Cita from  './components/Cita';
import styled from '@emotion/styled'

const Header = styled.section`
  background: linear-gradient(270deg,#f50a81 25.28%,#9d09db 59.7%,#f722c9 97.75%);
  width: 100%;
  height: 15px;
`

function App() {

  // Citas en localStorage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  
  // UseEffect para realizar ciertas operaciones cuando el state cambia

  useEffect( () => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales] );

  // Función que tome las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Función que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Hoy hay ' + citas.length + ' cita/s';


  return (
    <Fragment>
      <Header/>
      <h1>Administrador de Turnos</h1>
        <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
