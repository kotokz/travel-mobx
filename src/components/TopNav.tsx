import * as React from "react";
import { FlatButton } from "material-ui";
import MainIcon from "material-ui/svg-icons/image/style";
import {Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui/Toolbar";
import AppBar from "material-ui/AppBar";

export default class TopNav extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <AppBar
          style={{height: "40px", position: "fixed"}}
          title="Travel Mobx"
          titleStyle={{fontSize: "16px", height: "40px", lineHeight: "40px"}}
          iconElementLeft={<MainIcon color="#fff" />}
        />
        <Toolbar style={{position: "fixed", top: "40px", height: "36px", width: "100%", zIndex: 3}}>
          <ToolbarGroup firstChild />
          <ToolbarGroup>
            <FlatButton
              style={{margin: "0px"}}
              label="Settings"
              labelStyle={{textTransform: "none", color: "gray"}} />
            <FlatButton
              style={{margin: "0px"}}
              label="Logout"
              labelStyle={{textTransform: "none", color: "gray"}} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}