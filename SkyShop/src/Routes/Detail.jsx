import React, { useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { useContext } from 'react';
import customCss from "./Detail.module.css";
import { BotonContext } from '../Context/Context';
import { arrayToLowerCase, productos } from '../utils/products';

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // id de producto
  const producto = productos.find((prod) => prod.id == id); // producto encontrado en array por id
  const { loggedUser } = useContext(BotonContext);
  const { agregarProductoAlCarrito } = useContext(BotonContext);
  const [mainImg, setMainImg] = useState(producto.imagenes[0]); // estado que guarda la imagen que se muestra grande

  const handleMainImg = (newMainImg) => {
    if(newMainImg !== mainImg) setMainImg(newMainImg);
  }

  console.log("valor de producto: " + producto);

   // esta funcion recorre el array de strings y devuelve un array de strings en minusculas
  // es para que por cada carcateristica, suponiendo q las imagenes de iconos de las caracteristicas
  // son por ej: si la caracteristica es "Alimentos", la imagen/icono tendria q llamarse "caracteristica_alimentos.png"
  // esto sirve para implementar la busqueda dinamica de los iconos de las caracteristicas ya que
  // tampoco va a pasar que se puedan crear nuevas caracteristicas con nuevos iconos
  // sino que en el agregado de productos (si es q lo implementamos) seria ideal que
  // las caracteristicas se pudieran solo elegir tipo checkbox con un maximo de tildar de 5 opciones o algo asi
  // y en la carpeta "public" habria un icono por cada caracteristica
  const caracteristicasLowerCase = arrayToLowerCase(producto.caracteristicas);

  const mostrarCaracteristicas = () => {
    return producto.caracteristicas.map((caracteristica, i) => {
      const caracteristicaUrlImg = `/caracteristica_${caracteristicasLowerCase[i]}.png`;
      return (
        <li key={i}>
          <img src={caracteristicaUrlImg} alt={caracteristicasLowerCase[i]} />
          <p>{caracteristica}</p>
        </li>
      );
    });
  };
  if (!producto) {
    return <div>Producto no encontrado</div>;
  }
  const { nombre, imagenes, contenido, precio } = producto;
  return (
    <section className={customCss.detailSect}>
      <div className={customCss.divGral}>
        <div className={customCss.primerDiv}>
          <div className={customCss.divNombreYBoton}>
            <h3 className={customCss.nombreSt}>{nombre}</h3>
            <button
              className={customCss.btnCerrar}
              onClick={() => navigate(-1)}>
              <img src="/flechaizquierda.png" alt="flecha atras"/>
            </button>
          </div>
          <div className={customCss.imgDiv}>
            <img src={mainImg} alt={nombre} />
          </div>
          <div className={customCss.allImgsDiv}>
            {imagenes.map(imagen => <button
              className={customCss.imgOptionBtn}
              style={{ backgroundColor: imagen === mainImg && '#d0fdd7'}}
              onClick={() => handleMainImg(imagen)}>
                <img src={imagen}/>
              </button> )}
          </div>
        </div>
        <div>
          <div className={customCss.contenidoMod}>
            <ul>
              {contenido.split(',').map((item, index) => (
                <li key={index}>
                  {item}
                  <p>x1</p>
                </li>
              ))}
            </ul>
            <p className={customCss.precioP}><span>Precio </span>${precio}</p>
          </div>
          <div className={customCss.divBtn}>
            {loggedUser ? (
              <button className={customCss.btnAgregar} onClick={() => agregarProductoAlCarrito(producto)}>Agregar a mi pedido</button>
            ) : (
              <button className={customCss.btnAgregarDisabled} disabled>
                Debes iniciar sesión para agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={customCss.divCaracteristicas}>
        <h3>Características</h3>
        <ul className={customCss.listaCaracteristicas}>
          {mostrarCaracteristicas()}
        </ul>
      </div>
    </section>
  );
};
export default Detail;