import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ presupuesto, gastos }) => {

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



    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={ buildStyles({ pathColor: '#3B82F6', textColor:'#3B82F6', trailColor: '#F5F5F5', pathTransitionDuration: 2, }) } />
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto:</span> { formatearCantidad( presupuesto ) }
                </p>
                <p>
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