import * as React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import DevTools from "mobx-react-devtools";

export default class AppView extends React.Component<{children: any}, {}> {
    render() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem> Main </NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/timer">
                            <NavItem> Timer 2</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                { this.props.children }
                <DevTools/>
            </div>
        );
     }
};