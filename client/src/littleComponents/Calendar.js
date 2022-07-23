import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

import Form from "../mainComponents/Form";

const Calendar = () => {
    const { dateFromSelected, dateToSelected, allDatesAvailable } = useContext(CityContext);

    const indexFrom = allDatesAvailable.indexOf(dateFromSelected);
    const indexTo = allDatesAvailable.indexOf(dateToSelected);
    const allDatesTravelled = allDatesAvailable.slice(indexFrom, indexTo + 1)
    console.log(allDatesTravelled);
    const numOfDays = indexTo - indexFrom + 1;
    console.log(numOfDays);

    if (numOfDays > 0) {
        return (
            <Wrapper>
                {
                    allDatesTravelled.map((item, index) => {
                        return (
                            <DayBlock key={index}>
                                <div>Jour {index + 1} : {item}</div>
                                <Form/>
                            </DayBlock>
                        )
                    })
                }
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div``

const DayBlock = styled.div``

export default Calendar;