import styled from "styled-components"

export default function SidebarButton(props) {
    const Body = styled.div`
        width: 100%;
        height: 5rem;
        background: red;
    `
    return (
        <Body>
            {props.children}
        </Body>
    )
}