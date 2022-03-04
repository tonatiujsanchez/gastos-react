import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import IconCerrar from './../img/cerrar.svg'



const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [ nombre, setNombre ] = useState('') 
    const [ cantidad, setCantidad ] = useState('') 
    const [ categoria, setCategoria] = useState('') 
    const [ fecha, setFecha] = useState('') 
    const [ id, setId] = useState('') 

    const [ mensaje, setMensaje ] = useState('')

    useEffect(()=>{
        if( Object.keys( gastoEditar ).length > 0 ){
            setNombre( gastoEditar.nombre )
            setCantidad( gastoEditar.cantidad )
            setCategoria( gastoEditar.categoria )
            setFecha( gastoEditar.fecha )
            setId( gastoEditar.id )
        }
    },[])


    const ocultarModal = () =>{
        setAnimarModal(false)
        
        setTimeout(() => {
            setModal(false)
            setGastoEditar({})
        }, 500);

    }

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if( [nombre, cantidad, categoria].includes('') || cantidad <= 0){
            setMensaje('Todos los campos son ablogatorios')
            return
        }
        setMensaje('')
        guardarGasto({nombre, cantidad, categoria, fecha, id});
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img 
                src={ IconCerrar } 
                alt="Icono de cerrar" 
                title='Icono para cerrar modal de nuevo gasto'
                onClick={ ocultarModal } />
        </div>
        <form className={`formulario ${ animarModal ? 'animar' : 'cerrar' }` } onSubmit={ handleSubmit }>
            <legend>{ (Object.keys( gastoEditar ).length > 0) ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
            { mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje>}
            
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    type="text"
                    id='nombre'
                    placeholder='Añane el nombre del gasto'
                    value={ nombre }
                    onChange={ ( e ) => setNombre( e.target.value ) } />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    type="number"
                    id='cantidad'
                    placeholder='Añane la cantidad del gasto'
                    value={ cantidad }
                    onChange={ ( e ) => setCantidad( Number( e.target.value ) ) } />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select 
                    name="categoria" 
                    id="categoria" 
                    value={ categoria } 
                    onChange={ ( e ) => { setCategoria( e.target.value ) } }>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={ (Object.keys( gastoEditar ).length > 0) ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal