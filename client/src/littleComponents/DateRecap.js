import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

const DateRecap = () => {
    const { dateFromSelected, setDateFromSelected, dateToSelected, setDateToSelected, allDatesAvailable } = useContext(CityContext);

    const clearDates = () => {
        setDateFromSelected("");
        setDateToSelected("");
    }

    if (dateFromSelected !== "" && dateToSelected !== "") {
        if (allDatesAvailable.indexOf(dateFromSelected) > allDatesAvailable.indexOf(dateToSelected)) {
            return (
                <Wrapper>Attention. Votre voyage doit se terminer après son début.</Wrapper>
            )
        }
        return (
            <Wrapper>
                <div>Prévisions météo pour votre voyage du {dateFromSelected} au {dateToSelected} :</div>
                <button onClick={clearDates}>Clear</button>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    text-align: center;
`

export default DateRecap;