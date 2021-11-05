
import { useEffect, useState } from "react";
import { Col, Row, Button } from "antd";

function App() {
  const [simpson, setSimpson] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [searching, setSearching] = useState([1]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes`
      );

      const other = await response.json();
      //console.log(response);
      setSimpson(other);
      console.log(other);
      //console.log(simpson);
    };
    getData();
  }, []);

  const handleChangePhrase = () => {
    const getData = async () => {
      const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes`
      );

      const other = await response.json();
      console.log(response);
      setSimpson(other);
      console.log(other);
      //console.log(simpson);
    };
    getData();
  };
  const handleAddToFavourite = (item) => {
    if (!favourites.includes(item)) {
      setFavourites((prevState) => [...prevState, item]);
    }
  };
  const handleDelete = (item) => {
    const newFavouritesArreglo = favourites.filter((newItem) => {
      return newItem !== item;
    });
    setFavourites(newFavouritesArreglo);
  };
  const handleSearchPhrase = () => {
    const word = document.getElementById("quote").value.toLowerCase();
    const getData = async () => {
      const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes${word}`
      );
      const data = await response.json();
      console.log("resultados de busqueda: ", data);
      if (data.slips !== undefined) {
        setSearching(data);//2
      } else {
        setSearching([]);
      }
      console.log(data);
    };
    if (word !== "") {
      getData();
    } else {
      setSearching([]);
    }
  };

  return (
      <div>
        <Row>
          <Col span={12}>
            <h1>The Simpson</h1>
            <img src="https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205" alt="springfield"/>
            {simpson.map((item, key) => (
                <div key={key}>
                  <p>{item.simpson}</p>
                  <button onClick={() => handleAddToFavourite(item)}>
                    Marcar como favorito
                  </button>
                  <Button onClick={() => handleChangePhrase(1)} type="primary">
                    Siguiente
                  </Button>
                </div>
            ))}
          </Col>
          <Col span={12}>
            <div>
              <h1>Favoritos</h1>

              {favourites.map((item, key) => (
                  <div key={key}>
                    <p>{item.simpson}</p>
                    <div className="favourite_rigth">
                      <button onClick={() => handleDelete(item)}>
                        Quitar de Favoritos
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </Col>
        </Row>

        <div>
          <h1>Buscador</h1>
          <div>
            <label htmlFor="quote">Palabra clave: </label>
            <input type="text" name="quote" id="quote" />
            <button onClick={handleSearchPhrase}>Buscar</button>
          </div>
          <h2>Resultados de la búsqueda</h2>
          <div>
            {searching.length === 0
                ? "No se encontraron coincidencias"
                : searching.map((item, key) => (
                    <div key={key}>
                      <p>{item.simpson}</p>
                      <button onClick={() => handleAddToFavourite(item)}>
                        Marcar como favorito
                      </button>
                    </div>
                ))}
          </div>
        </div>
      </div>
  );
}

export default App;