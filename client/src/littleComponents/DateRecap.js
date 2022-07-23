import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

const DateRecap = () => {
    const { dateFromSelected, dateToSelected, allDatesAvailable } = useContext(CityContext);

    if (dateFromSelected !== "" && dateToSelected !== "") {
        if (allDatesAvailable.indexOf(dateFromSelected) > allDatesAvailable.indexOf(dateToSelected)) {
            return (
                <Wrapper>Attention. Votre voyage doit se terminer après son début.</Wrapper>
            )
        }
        return (
            <Wrapper>
                Prévisions météo pour votre voyage du {dateFromSelected} au {dateToSelected} :
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    text-align: center;
`

export default DateRecap;