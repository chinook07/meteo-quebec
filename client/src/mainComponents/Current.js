import { useContext, useEffect} from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

const Current = () => {

    const { localWeather, setLocalWeather } = useContext(CityContext)

    const success = (position) => {
        const crd = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
            .then(res => res.json())
            .then(data => setLocalWeather(data))
    }

    const error = (err) => {
        console.warn(`ERROR(${err.code}: ${err.message})`);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    if (localWeather.weather) {
        return (
            <Wrapper>
                {
                    localWeather.name !== ""
                        ? <h1>Conditions actuelles à {localWeather.name}:</h1>
                        : <h1>Conditions actuelles à {localWeather.coord.lat}, {localWeather.coord.lon}:</h1>
                }
                <p>{(localWeather.main.temp).toFixed(0)}°C, ressenti : {(localWeather.main.feels_like).toFixed(0)}°C</p>
                {
                    localWeather.main.temp > 29.5 &&
                        <Warning>Chaleur extrême</Warning>
                }
            </Wrapper>
        )
    } else {
        return (
            <p>Emplacement non disponible</p>
        )
    }
}

const Wrapper = styled.div`
    display: block;
    margin: 5px auto;
    text-align: center;
`

const Warning = styled.div`
    background-color: var(--c-yellow);
    padding: 15px;
`

export default Current;