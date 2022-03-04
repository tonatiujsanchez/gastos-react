import Gasto from "./Gasto"


const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {


    const capitalize= (str) => {
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
      }

  return (
    <div className="listado-gastos contenedor">
        

        { ( filtro ) 
            ?
            <>  
                <h2> { gastosFiltrados.length ? capitalize( filtro ) : `No hay gastos en ${ capitalize( filtro ) }` }</h2>
                {
                    gastosFiltrados.map(( gastoFilter )=>(
                        <Gasto 
                            gasto = { gastoFilter } 
                            key={ gastoFilter.id }
                            setGastoEditar = { setGastoEditar }
                            eliminarGasto = { eliminarGasto } 
                        />
                    ))
                }
            </>
            :<>
                <h2> { gastos.length ? 'Gastos': 'No has agrenado ningún gasto' }</h2>
                {
                    gastos.map(( gasto )=>(
                        <Gasto 
                            gasto = { gasto } 
                            key={ gasto.id }
                            setGastoEditar = { setGastoEditar }
                            eliminarGasto = { eliminarGasto } 
                        />
                    ))
                }
            </> 
        }
    </div>
  )
}

export default ListadoGastos