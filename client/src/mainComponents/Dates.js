import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";
import { format, addDays } from 'date-fns'
import { frCA } from "date-fns/locale";

import DateRecap from "../littleComponents/DateRecap";
import Calendar from "../littleComponents/Calendar";

const Dates = () => {
    const { todayDate, dateFromSelected, setDateFromSelected, dateToSelected, setDateToSelected, allDatesAvailable } = useContext(CityContext)
    
    if (todayDate !== undefined) {
        // const dayOfWeek = format(todayDate, "EEEE", {locale: frCA});
        // const dateOfMonth = format(todayDate, "do", { locale: frCA });

        for (let i = 0; i < 16; i++) {
            allDatesAvailable[i] = (format(addDays(todayDate, i), "EEEE dd", {locale: frCA}))
        }

        const updateDateFrom = (e) => setDateFromSelected(e.target.value);
        const updateDateTo = (e) => setDateToSelected(e.target.value);

        return (
            <Wrapper>
                <h2>Sélectionnez vos dates de voyage.</h2>
                <DeA>
                    <div>
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
                    </div>
                </DeA>
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
    display: flex;
    justify-content: space-evenly;
    padding: 15px;
    div {
        display: flex;
        flex-direction: column;
    }
`

export default Dates;