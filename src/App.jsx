import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useRef } from 'react';
import arg from './images/arg.webp'
import usa from './images/usa.svg'

function App() {
  const [ars, setArs] = useState(0)
  const [oficial, setOficial] = useState(0)
  const [blue, setBlue] = useState(0)
  const [oficialConvertido, setOficialConvertido] = useState(0)
  const [blueConvertido, setBlueConvertido] = useState(0)
  let pesos = useRef()
  let dolarOficial = useRef()
  let dolarBlue = useRef()

  async function getDolarData() {
    let url = "https://dolarsi.com/api/api.php?type=valoresprincipales"
    let response = await axios.get(url)
    setOficial(parseFloat(response.data[0].casa.venta.replace(',', '.')))
    setBlue(parseFloat(response.data[1].casa.venta.replace(',', '.')))
  }
  useEffect(() => {
    getDolarData()
  }, [])

  function convertirPesosADolares() {
    setOficialConvertido((pesos.current.value / oficial).toFixed(2))
    setBlueConvertido((pesos.current.value / blue).toFixed(2))
    dolarOficial.current.value = ''
    dolarBlue.current.value = ''
    if (!pesos.current.value) {
      setArs(0)
    }
  }

  function convertirOficialAPesos() {
    pesos.current.value = ''
    dolarBlue.current.value = ''
    setArs((oficial * dolarOficial.current.value).toFixed(2))
    if (dolarOficial.current.value) {
      setBlueConvertido(dolarOficial.current.value)
    } else {
      setOficialConvertido(0)
      setBlueConvertido(0)
    }
  }

  function convertirBlueAPesos() {
    pesos.current.value = ''
    dolarOficial.current.value = ''
    setArs((blue * dolarBlue.current.value).toFixed(2))
    if (dolarBlue.current.value) {
      setOficialConvertido(dolarBlue.current.value)
    } else {
      setBlueConvertido(0)
      setOficialConvertido(0)
    }
  }

  return (
    <div className='main'>
      <section className='calculadora'>
        <h1>Convertir Pesos a Dólares</h1>
        <div className='container'>
          <div className='info-plata'>
            <div className='moneda'>
              <img src={arg} alt='billete argentino' />
              <p>$1 Peso Argentino</p>
            </div>
            <i className="fa-sharp fa-solid fa-arrow-down"></i>
            <div className='moneda'>
              <img src={usa} alt='billete dolar' />
              <p>${oficial} Dólar Oficial</p>
            </div>
            <div className='moneda'>
              <img src={usa} alt='billete dolar' />
              <p>${blue} Dólar Blue</p>
            </div>
          </div>
          <form onSubmit={convertirPesosADolares}>
            <fieldset>
              <label htmlFor='ars'><img src={arg} alt='billete argentino' /></label>
              <input type='number' name='ars' id='ars' placeholder={'Pesos: $' + ars} ref={pesos} onChange={convertirPesosADolares} />
            </fieldset>
            <fieldset>
              <label htmlFor='ofi'><img src={usa} alt='billete dolar' /></label>
              <input type='number' name='ofi' id='ofi' placeholder={'Dólar Oficial: $' + oficialConvertido} ref={dolarOficial} onChange={convertirOficialAPesos} />
            </fieldset>
            <fieldset>
              <label htmlFor='blue'><img src={usa} alt='billete dolar' /></label>
              <input type='number' name='blue' id='blue' placeholder={'Dólar Blue: $' + blueConvertido} ref={dolarBlue} onChange={convertirBlueAPesos} />
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
