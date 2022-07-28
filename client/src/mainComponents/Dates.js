import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";
import { format, addDays } from 'date-fns'
import { frCA } from "date-fns/locale";

import DateRecap from "../littleComponents/DateRecap";
import Calendar from "../littleComponents/Calendar";

const Dates = () => {
    const { todayDate, dateFromSelected, setDateFromSelected, dateToSelected, setDateToSelected, allDatesAvailable } = useContext(CityContext)

    const [timeTravelError, setTimeTravelError] = useState(false);
    
    if (todayDate !== undefined) {
        // const dayOfWeek = format(todayDate, "EEEE", {locale: frCA});
        // const dateOfMonth = format(todayDate, "do", { locale: frCA });

        for (let i = 0; i < 16; i++) {
            allDatesAvailable[i] = (format(addDays(todayDate, i), "EEEE dd", {locale: frCA}))
        }

        const updateDate = (date) => {
            if (dateFromSelected !== "" && dateToSelected === "") {
                if (allDatesAvailable.indexOf(dateFromSelected) > allDatesAvailable.indexOf(date)) {
                    setTimeTravelError(true);
                } else {
                    setDateToSelected(date);
                    setTimeTravelError(false);
                }
                
            } else {
                setDateFromSelected(date);
                setDateToSelected("");
            }
        }

        return (
            <Wrapper>
                <h2>Sélectionnez vos dates de voyage.</h2>
                <DeA>
                    {
                        allDatesAvailable.map((item, index) => {
                            
                            return (
                                <div
                                    key={index}
                                    className={`
                                        ${dateFromSelected === item || dateToSelected === item ? "selected" : ""}
                                        ${allDatesAvailable.indexOf(item) > allDatesAvailable.indexOf(dateFromSelected) && allDatesAvailable.indexOf(item) < allDatesAvailable.indexOf(dateToSelected)? "between" : ""}
                                    `}
                                    onClick={() => updateDate(item)}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </DeA>
                {
                    timeTravelError &&
                    <div>Attention. Votre voyage doit se terminer après son début.</div>
                }
                <DateRecap />
                <Calendar />
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                Loading...
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    h2 {
        text-align: center;
    }
`

const DeA = styled.div`
    border: 2px solid var(--c-green);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
    > div {
        border: 1px solid var(--c-lemon);
        cursor: pointer;
        margin: 10px 0;
        padding: 10px 5px;
        &:hover {
            background-color: var(--c-green);
            color: var(--c-light);
        }
    }
    .selected {
        background-color: var(--c-dark);
        color: var(--c-light);
    }
    .between {
        background-color: var(--c-lemon);
        color: var(--c-dark);
    }
`

export default Dates;