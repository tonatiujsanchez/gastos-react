import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);
    const [ porcentaje, setPorcentaje ] = useState(100);

    const formatearCantidad = ( cantidad ) => {
        return cantidad.toLocaleString('en-US',{
            style:'currency', currency: 'USD'
        })
    }

    useEffect(()=>{

        const totalGastado = gastos.reduce( ( acomulador, gasto )=>{
            return acomulador + gasto.cantidad;
        },0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje( nuevoPorcentaje )
        }, 500);
        
        
        setGastado( totalGastado )
        setDisponible( totalDisponible )
    },[gastos])

    const handleResetApp = () =>{
        const result = confirm(`¿Desdeas eliminar todo y reiniciar?`)
        if( result ){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    value={porcentaje} 
                    text={`${porcentaje}% Gastado`} 
                    styles={ buildStyles({ 
                        pathColor: `${ disponible < 0 ? '#DC2626' : '#3B82F6' }`, 
                        textColor: `${ disponible < 0 ? '#DC2626' : '#3B82F6' }`, 
                        trailColor: '#F5F5F5', 
                        pathTransitionDuration: 2, 
                        }) } />
            </div>
            <div className="contenido-presupuesto">
                <button type="button" className="reset-app" onClick={ handleResetApp }>Reiniciar</button>
                <p>
                    <span>Presupuesto:</span> { formatearCantidad( presupuesto ) }
                </p>
                <p className={`${ disponible < 0 ? 'negativo' : '' }`}>
                    <span>Disponible:</span> { formatearCantidad( disponible ) }
                </p>
                <p>
                    <span>Gastado:</span> { formatearCantidad( gastado ) }
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto