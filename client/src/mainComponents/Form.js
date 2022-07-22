import { useState } from "react";
import styled from "styled-components";
import { getDay, getDate } from "date-fns";

const Form = () => {

    const [townEntered, setTownEntered] = useState("");
    const updateTown = (e) => setTownEntered(e.target.value);
    const [townChoices, setTownChoices] = useState([]);

    

    const chooseCity = (e) => {
        e.preventDefault();
        console.log(townEntered);
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${townEntered}&limit=3&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
            .then(res => res.json())
            .then(data => setTownChoices(data))
    }

    return (
        <Wrapper onSubmit={chooseCity}>
            <fieldset>
                <label>Insérez</label>
                <input
                    type="text"
                    value={townEntered}
                    onChange={updateTown}
                ></input>
                <button type="submit">Ok</button>
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