import styled from "styled-components";

const Header = () => {

    return (
        <Wrapper>
            <nav>
                <button>1</button>
                <button>2</button>
                <button>3</button>
            </nav>
            <h1>Météo pour emporter</h1>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    nav {
        display: flex;
        justify-content: center;
        button {
            background-color: var(--c-green);
            border: none;
            color: var(--c-light);
            cursor: pointer;
            padding: 10px;
        }
    }
`

export default Header;