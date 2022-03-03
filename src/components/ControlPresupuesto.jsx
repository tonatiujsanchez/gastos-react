

const ControlPresupuesto = ({ presupuesto }) => {

    const getPresupuesto = ( cantidad ) => {
        return cantidad.toLocaleString('en-US',{
            style:'currency', currency: 'USD'
        })
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <p>Gráfica</p>
        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto:</span> { getPresupuesto( presupuesto ) }
            </p>
            <p>
                <span>Disponible:</span> { getPresupuesto( 0 ) }
            </p>
            <p>
                <span>Gastado:</span> { getPresupuesto( 0 ) }
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto