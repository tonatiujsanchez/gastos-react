import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)

  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastos, setGatos ] = useState([])

  const [ gastoEditar, setGastoEditar ] = useState({})

  useEffect(()=>{
    if( Object.keys( gastoEditar ).length > 0 ){
      handleNuevoGasto()

    }
  },[ gastoEditar ])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = ( gasto ) => {

    if( gasto.id ){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGatos( gastosActualizados );

    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGatos( [...gastos, gasto] )
    }

    setAnimarModal(false)
    setTimeout(() => {
        setGastoEditar({})
        setModal(false)
    }, 500);
  }

  const eliminarGasto = ( idGasto )=>{
    const nuevosGastos = gastos.filter( gastoState => gastoState.id !== idGasto )
    setGatos( nuevosGastos )
  }

  return (
    <div className={ modal ? "fijar" : '' }>
      <Header 
        presupuesto = { presupuesto }
        setPresupuesto = { setPresupuesto }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = {setIsValidPresupuesto }
        gastos = { gastos }
      />

      { isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
            gastos={ gastos }
            setGastoEditar = { setGastoEditar }
            eliminarGasto = { eliminarGasto } />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="Icono nuevo gasto" 
              title="Icono para agregar un nuevo gasto"
              onClick={ handleNuevoGasto } />
          </div>
        </>
      )}

      { ( modal ) && <Modal 
                          setModal={ setModal } 
                          animarModal = { animarModal }
                          setAnimarModal = { setAnimarModal }
                          guardarGasto = { guardarGasto }
                          gastoEditar = { gastoEditar }
                          setGastoEditar = { setGastoEditar } />

      }
    </div>
  )
}

export default App
