import * as React from "react";
// import { Navbar, Nav, NavItem } from "react-bootstrap";
// import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TopNav from "./TopNav";

import DevTools from "mobx-react-devtools";

export default class AppView extends React.Component<{children: any}, {}> {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <TopNav />
                <div style={{overflowY: "auto", position:"relative"}}>
                    <div style={{position:"relative", marginTop: "90px", marginLeft: "300px"}}>
                        <div style={{marginTop: "30px", marginLeft: "0px"}}>
                        <div className="row">
                            <div>
                            {this.props.children}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <DevTools/>
            </div>
            </MuiThemeProvider>
        );
    }
};

            // <div>
            //     <Navbar>
            //         <Nav>
            //             <IndexLinkContainer to="/">
            //                 <NavItem> Main </NavItem>
            //             </IndexLinkContainer>
            //             <LinkContainer to="/timer">
            //                 <NavItem> Timer 2</NavItem>
            //             </LinkContainer>
            //             <LinkContainer to="/month">
            //                 <NavItem> MonthTable </NavItem>
            //             </LinkContainer>
            //         </Nav>
            //     </Navbar>
            //     { this.props.children }
            //     <DevTools/>
            // </div>