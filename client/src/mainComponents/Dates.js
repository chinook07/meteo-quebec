import { useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";
import { startOfTomorrow, getDay, getDate, format, addDays } from 'date-fns'
import { ca, fr, frCA } from "date-fns/locale";

const Dates = () => {
    const { todayDate } = useContext(CityContext)
    console.log(todayDate);
    
    if (todayDate !== undefined) {
        const dayOfWeek = format(todayDate, "EEEE", {locale: frCA});
        const dateOfMonth = format(todayDate, "do", { locale: frCA });
        const allDatesFrom = [];
        for (let i = 0; i < 16; i++) {
            allDatesFrom[i] = (addDays(todayDate, i))
        }
        console.log(allDatesFrom);
        return (
            <Wrapper>
                <h2>Vous partez quand? Nous sommes {dayOfWeek} le {dateOfMonth}.</h2>
                <DeA>
                    <div>
                        <label htmlFor="dateFrom">Date de départ</label>
                        <select
                            id="dateFrom"
                            type="date"
                        >
                            {
                                allDatesFrom.map((item, index) => {
                                    return (
                                        <option key={index}>{format(item, "EEEE dd", {locale: frCA})}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dateTo">Date de fin</label>
                        <select
                            id="dateTo"
                            type="date"
                        >
                            {
                                allDatesFrom.map((item, index) => {
                                    return (
                                        <option key={index}>{format(item, "EEEE dd", {locale: frCA})}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </DeA>
                
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

const Wrapper = styled.div``

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