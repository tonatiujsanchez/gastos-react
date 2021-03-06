import { useState, useEffect } from 'react'
import { Filtros } from './components/Filtros'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)

  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastos, setGastos ] = useState([])

  const [ gastoEditar, setGastoEditar ] = useState({})

  const [filtro, setFiltro] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

  useEffect(()=>{
    if( Object.keys( gastoEditar ).length > 0 ){
      handleNuevoGasto()

    }
  },[ gastoEditar ])


  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if( presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }

    const gastosLS = JSON.parse( localStorage.getItem('gastos') ) ?? [];
    setGastos( gastosLS )
  },[])


  useEffect( ()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify( gastos ));
  }, [ gastos ])

  useEffect(()=>{

    if (filtro) {
      const gastosFiltrados = gastos.filter( gastoState => gastoState.categoria === filtro )
      setGastosFiltrados( gastosFiltrados )
    }

  },[filtro])
  

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 350)
  }

  const guardarGasto = ( gasto ) => {

    if( gasto.id ){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos( gastosActualizados );

    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos( [...gastos, gasto] )
    }

    setAnimarModal(false)
    setTimeout(() => {
        setGastoEditar({})
        setModal(false)
    }, 300);
  }

  const eliminarGasto = ( idGasto )=>{
    const nuevosGastos = gastos.filter( gastoState => gastoState.id !== idGasto )
    setGastos( nuevosGastos )
  }


  

  return (
    <div className={ modal ? "fijar" : '' }>
      <Header 
        presupuesto = { presupuesto }
        setPresupuesto = { setPresupuesto }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = {setIsValidPresupuesto }
        gastos = { gastos }
        setGastos = { setGastos }
      />

      { isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = { filtro }
              setFiltro = { setFiltro } />
            <ListadoGastos
              gastos={ gastos }
              setGastoEditar = { setGastoEditar }
              eliminarGasto = { eliminarGasto }
              filtro = { filtro }
              gastosFiltrados = { gastosFiltrados } />
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
