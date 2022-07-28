// import { useEffect, useState } from "react";
import MapOfQc from "./MapOfQc";
import Current from "./Current";
import Dates from "./Dates";
import Summary from "./Summary";

import styled from "styled-components";

const Main = () => {

    return (
        <Wrapper>
            <Current />
            <Dates />
            {/* <MapOfQc /> */}
            <Summary />
        </Wrapper>
    )
}

const Wrapper = styled.main`
    background-color: var(--c-light);
    padding: 20px;
`

export default Main;