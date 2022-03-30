import styled from "styled-components"

export default function SidebarButton(props) {
    const Body = styled.div`
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 5px 5px 5px 5px;
    `
    return (
        <Body>
            {props.children}
        </Body>
    )
}