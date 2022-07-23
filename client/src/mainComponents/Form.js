import { useState } from "react";
import styled from "styled-components";

const Form = () => {

    const [townEntered, setTownEntered] = useState("");
    const updateTown = (e) => setTownEntered(e.target.value);
    const [townChoices, setTownChoices] = useState([]);

    

    const chooseCity = (e) => {
        e.preventDefault();
        if (townEntered !== "") {
            console.log(townEntered);
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${townEntered}&limit=3&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
                .then(res => res.json())
                .then(data => setTownChoices(data))
        }
    }

    return (
        <Wrapper onSubmit={chooseCity}>
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
            <Choices>
                {
                    townChoices.length > 0 &&
                        townChoices.length == 1
                            ? <div>{townChoices[0].name}</div>
                        : townChoices.map((item, index) => {
                            return (
                                <Choice key={index}>
                                    <City>{item.name}</City>
                                    <State>{item.state}</State>
                                    <Country>{item.country}</Country>
                                </Choice>
                            )
                            })
                }
            </Choices>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    fieldset {
        display: flex;
        flex-direction: column;
        text-align: center;
        div {
            display: flex;
            justify-content: center;
            input {
                background-color: var(--c-lemon);
                border: 1px solid var(--c-green);
                border-radius: 5px;
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