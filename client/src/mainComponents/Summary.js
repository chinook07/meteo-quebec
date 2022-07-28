import { useState, useContext } from "react";
import styled from "styled-components";
import { CityContext } from "../barebones/CityContext";

const Summary = () => {

    const { dateFromSelected, dateToSelected, allDatesAvailable } = useContext(CityContext);
    const showFromTo = [allDatesAvailable.indexOf(dateFromSelected), allDatesAvailable.indexOf(dateToSelected)];
    const showThese = allDatesAvailable.slice(showFromTo[0], showFromTo[1] + 1)
    const [showSum, setShowSum] = useState(false);

    const showGraph = () => {
        showSum ? setShowSum(false) : setShowSum(true)
    }

    if (dateFromSelected !== "" && dateToSelected !== "") {
        console.log(dateFromSelected, dateToSelected, showThese);
        return (
            <Wrapper>
                <button onClick={showGraph}>Voir graphique</button>
                {
                    showSum &&
                        <Graph>
                            <Jours>
                                <div>Jour</div>
                                {
                                    showThese.map((item, index) => {
                                        return (
                                            <div key={index}>{item}</div>
                                        )
                                    })
                                }
                            </Jours>
                            <Météo>
                                <div>Météo</div>
                                {
                                    showThese.map((item, index) => {
                                        return (
                                            <div key={index}>{item}</div>
                                        )
                                    })
                                }
                            </Météo>
                    </Graph>
                }
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div``

const Graph = styled.div`
    /* display: flex;
    margin: 15px auto; */
    
`

const Jours = styled.div`
    display: flex;
    margin: 15px auto;
    > div {
        border-top: 1px solid var(--c-green);
        margin: 10px;
        padding: 10px;
    }
`

const Météo = styled.div`
    display: flex;
    margin: 15px auto;
    > div {
        border-bottom: 1px solid var(--c-green);
        margin: 10px;
        padding: 10px;
    }
`

export default Summary;