import { useEffect, useState } from "react";
import MapOfQc from "./MapOfQc";
import Form from "./Form";
import Current from "./Current";
import Dates from "./Dates";

import styled from "styled-components";

const Main = () => {

    return (
        <Wrapper>
            <Current />
            <Dates />
            <Form />
            <MapOfQc />
        </Wrapper>
    )
}

const Wrapper = styled.main`
`

export default Main;