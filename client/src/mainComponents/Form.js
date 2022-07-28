import { useState, useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

import ActualWeather from "../littleComponents/ActualWeather";

const Form = ({ dateNum }) => {
    
    const { entireForecast, setEntireForecast } = useContext(CityContext);
    console.log(entireForecast);

    const [townEntered, setTownEntered] = useState("");
    const updateTown = (e) => {
        setTownEntered(e.target.value);
        setNoResultsFound(false);
    };
    const [townChoices, setTownChoices] = useState([]);
    const [todaysDestination, setTodaysDestination] = useState("")

    const [localWeatherGotten, setLocalWeatherGotten] = useState([]);

    const [noResultsFound, setNoResultsFound] = useState(false);

    const chooseCity = (e) => {
        if (townEntered !== "") {
            console.log(townEntered);
            e.preventDefault();
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${townEntered}&limit=3&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
                .then(res => res.json())
                .then(data => {
                    setTownChoices(data)
                    if (data.length === 0) {
                        console.log("none found");
                        setNoResultsFound(true)
                    }
                })
        } else {
            e.preventDefault()
        }
    }

    const getLocalWeather = (coords) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&key=efcab29fd72a499ebc37f605f0cdb1af&lang=fr`)
            .then(res => res.json())
            .then(data => {
                setTodaysDestination(data.city_name);
                setLocalWeatherGotten(data.data);
                setTownChoices([]);
                setEntireForecast((prev) => [...prev, {city: data.city_name, forecast: data.data}])
            })
    }

    

    return (
        <Wrapper>
            <form onSubmit={chooseCity}>
                <fieldset>
                    <DestinationPrevue>
                        <label>Destination prévue :</label>
                        {
                            todaysDestination !== "" &&
                            <span> {todaysDestination}</span>
                        }
                    </DestinationPrevue>
                    
                    <div>
                        <input
                            type="text"
                            value={townEntered}
                            onChange={updateTown}
                        ></input>
                        <button type="submit">Recherche</button>
                    </div>
                    {
                        noResultsFound &&
                        <NoneFound>Aucun résultat</NoneFound>
                    }
                </fieldset>
            </form>
            
            {
                townChoices.length > 0 &&
                <Choices> 
                {
                    townChoices.map((item, index) => {
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
            }
            {
                localWeatherGotten.length > 1 &&
                    <div>
                        <ActualWeather localWeatherGotten={localWeatherGotten} dateNum={dateNum} />
                        
                    </div>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 10px;
    form {
        border: 1px solid var(--c-green);
        border-radius: 10px;
        padding: 5px;
        fieldset {
            border: 0.5px solid var(--c-lemon);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            padding: 10px;
            text-align: center;
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
    }
    
`

const DestinationPrevue = styled.div`
    span {
        font-weight: bold;
    }
`

const NoneFound = styled.div`
    color: var(--c-dark);
    font-weight: bold;
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