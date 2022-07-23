import { useState } from "react";
import styled from "styled-components";

import ActualWeather from "../littleComponents/ActualWeather";

const Form = ({dateNum}) => {

    const [townEntered, setTownEntered] = useState("");
    const updateTown = (e) => setTownEntered(e.target.value);
    const [townChoices, setTownChoices] = useState([]);

    const [localWeatherGotten, setLocalWeatherGotten] = useState([]);

    const chooseCity = (e) => {
        if (townEntered !== "") {
            console.log(townEntered);
            e.preventDefault();
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${townEntered}&limit=3&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
                .then(res => res.json())
                .then(data => setTownChoices(data))
        } else {
            e.preventDefault()
        }
    }

    const getLocalWeather = (coords) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&key=efcab29fd72a499ebc37f605f0cdb1af&lang=fr`)
            .then(res => res.json())
            .then(data => setLocalWeatherGotten(data.data))
    }

    return (
        <Wrapper>
            <form onSubmit={chooseCity}>
                <fieldset>
                    <label>Destination prévue :</label>
                    <div>
                        <input
                            type="text"
                            value={townEntered}
                            onChange={updateTown}
                        ></input>
                        <button type="submit">Recherche</button>
                    </div>
                </fieldset>
            </form>
            
            <Choices>
                {
                    townChoices.length > 0 &&
                        townChoices.length === 1
                            ? <div>{townChoices[0].name}</div>
                            : townChoices.map((item, index) => {
                                return (
                                    <Choice key={index} onClick={() => getLocalWeather(item)}>
                                        <City>{item.name}</City>
                                        <State>{item.state}</State>
                                        <Country>{item.country}</Country>
                                    </Choice>
                                )
                                })
                }
            </Choices>
            {
                localWeatherGotten.length > 1 &&
                    <ActualWeather localWeatherGotten={localWeatherGotten} dateNum={dateNum} />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    fieldset {
        display: flex;
        flex-direction: column;
        text-align: center;
        label {
            margin-top: 10px;
        }
        div {
            display: flex;
            justify-content: center;
            margin: 10px auto;
            input {
                background-color: var(--c-lemon);
                border: 1px solid var(--c-green);
                border-radius: 5px;
                padding: 7px;
            }
            button {
                background-color: var(--c-lemon);
                border: 1px solid var(--c-green);
                border-radius: 5px;
                padding: 7px;
            }
        }
    }
`

const Choices = styled.div`
    background-color: var(--c-lemon);
    display: flex;
    justify-content: space-between;
    padding: 15px;
`

const Choice = styled.div`
    background-color: var(--c-green);
    border-radius: 5px;
    color: var(--c-light);
    cursor: pointer;
    padding: 5px;
    text-align: center;
    min-width: calc(80% / 3);
`

const City = styled.p``

const State = styled.p``

const Country = styled.p`
    font-size: large;
`

export default Form;