import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

import Form from "../mainComponents/Form";

const Calendar = () => {
    const { dateFromSelected, dateToSelected, allDatesAvailable } = useContext(CityContext);

    const indexFrom = allDatesAvailable.indexOf(dateFromSelected);
    const indexTo = allDatesAvailable.indexOf(dateToSelected);
    let allDatesTravelled = allDatesAvailable.slice(indexFrom, indexTo + 1)
    const numOfDays = indexTo - indexFrom + 1;

    const add2ndCity = (item, index) => {
        console.log(item, index);
        // allDatesTravelled.splice(index, 0, item);
        console.log(allDatesTravelled);
    }

    if (numOfDays > 0) {
        return (
            <Wrapper>
                {
                    allDatesTravelled.map((item, index) => {
                        return (
                            <DayBlock key={index}>
                                <DateAndButton>
                                    <div>Jour {index + 1} : {item}</div>
                                    <AddMoreCity onClick={() => add2ndCity(item, index)}>Ajoutez une autre ville pour la même journée</AddMoreCity>
                                </DateAndButton>
                                <Form dateNum={indexFrom + index}/>
                            </DayBlock>
                        )
                    })
                }
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div``

const DayBlock = styled.div`
    margin-top: 15px;
`

const DateAndButton = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`

const AddMoreCity = styled.button`
    background-color: var(--c-lemon);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 8px;
`

export default Calendar;