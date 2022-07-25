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

        // if (dateFromSelected === "" && dateToSelected === "") {
        //     setDateFromSelected(allDatesAvailable[0]);
        //     setDateToSelected(allDatesAvailable[0]);
        // }

        const updateDateFrom = (e) => setDateFromSelected(e.target.value);
        const updateDateTo = (e) => setDateToSelected(e.target.value);

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
                                <div key={index} onClick={() => updateDate(item)}>
                                    {item}
                                </div>
                            )
                        })
                    }
                    {/* <div>
                        <label htmlFor="dateFrom">Date de départ</label>
                        <select
                            id="dateFrom"
                            value={dateFromSelected}
                            onChange={updateDateFrom}
                        >
                            {
                                allDatesAvailable.map((item, index) => {
                                    return (
                                        <option key={index}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dateTo">Date de fin</label>
                        <select
                            id="dateTo"
                            value={dateToSelected}
                            onChange={updateDateTo}
                        >
                            {
                                allDatesAvailable.map((item, index) => {
                                    return (
                                        <option key={index}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div> */}
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
    /* display: flex;
    justify-content: space-evenly;
    padding: 15px; */
    /* div {
        display: flex;
        flex-direction: column;
        label {
            padding: 5px;
            text-align: center;
        }
        select {
            padding: 3px;
        }
    } */
    
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
`

export default Dates;