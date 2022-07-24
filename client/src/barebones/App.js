import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import Header from "../sideComponents/Header";

import Main from "../mainComponents/Main";
import Apropos from "../mainComponents/Apropos";
import Contact from "../mainComponents/Contact";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Wrapper>
                <Routes>
                    <Route index element={<Main/>}></Route>
                    <Route path="/apropos" element={<Apropos />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                </Routes>
            </Wrapper>
        </BrowserRouter>
    );
}

const Wrapper = styled.main`
    color: var(--c-green);
`

export default App;