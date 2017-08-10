import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import { ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";
import Popover from "material-ui/Popover";

const style = {
  appBar: {
    boxShadow: "none"
  },
  navButton: {
    color: 'white'
  }
};
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isSmallSize: true,
      iconStyleLeft: {},
      popOverOpen: false
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOverOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOverOpen: false
    });
  };

  componentWillMount() {
    if (this.props.width === SMALL) {
      this.setState({
        isSmallSize: true,
        iconStyleLeft: {}
      });
    } else {
      this.setState({
        isSmallSize: false,
        iconStyleLeft: { display: "none" }
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.width === SMALL) {
      this.setState({
        isSmallSize: true,
        iconStyleLeft: {}
      });
    } else {
      this.setState({
        isSmallSize: false,
        iconStyleLeft: { display: "none" }
      });
    }
  }

  renderMenuItems() {
    return [
      <MenuItem
        key={1}
        onTouchTap={() => this.props.history.push("/event/browse")}
      >
        Events
      </MenuItem>,
      <MenuItem key={2}>Results</MenuItem>,
      <MenuItem key={3}>Blog</MenuItem>,
      <MenuItem key={4}>Contact</MenuItem>
    ];
  }

  renderNavItems() {
    // render drawer if screen is small
    if (this.state.isSmallSize) {
      return (
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem key={1} containerElement={<Link to="/" />}>
            Home
          </MenuItem>
          {this.renderMenuItems()}
        </Drawer>
      );
    } else {
      // render buttons if screen is not small
      return (
        <ToolbarGroup>
          <FlatButton
            style={style.navButton}
            label="Events"
            onTouchTap={() => this.props.history.push("/event/browse")}
          />
          <FlatButton
            style={style.navButton}
            label="Results" 
          />
          <FlatButton
            style={style.navButton}
            label="Blog"
          />
          <FlatButton
            style={style.navButton}
            label="Contact" 
          />
        </ToolbarGroup>
      );
    }
  }

  renderUserLink() {
    if (this.props.authenticated) {
      const { user } = this.props;

      if (user) {
        return (
          <ToolbarGroup>
            <FlatButton
              style={style.navButton}
              onTouchTap={this.handleTouchTap.bind(this)}
              label={"Hi, " + user.name}
            />
            <Popover
              open={this.state.popOverOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              onRequestClose={this.handleRequestClose.bind(this)}
            >
              <Menu>
                <MenuItem
                  onTouchTap={() => this.setState({ popOverOpen: false })}
                  containerElement={<Link to="/profile" />}
                  primaryText="Profile"
                />
                <MenuItem
                  onTouchTap={() => this.setState({ popOverOpen: false })}
                  containerElement={<Link to="/signout" />}
                  primaryText="Sign out"
                />
              </Menu>
            </Popover>
          </ToolbarGroup>
        );
      }
    } else {
      return (
        <ToolbarGroup>
          <FlatButton
            style={style.navButton}
            label="Sign in"
            containerElement={<Link to="/signin" />}
          />
          <ToolbarSeparator />
          <FlatButton
            style={style.navButton}
            label="Sign up"
            containerElement={<Link to="/signup" />} 
          />
        </ToolbarGroup>
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar
          style={style.appBar}
          title="DeoXrace"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconStyleLeft={this.state.iconStyleLeft}
          onTitleTouchTap={() => this.props.history.push("/")}
        >
          {this.renderNavItems()}
          {this.renderUserLink()}
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.info
  };
}

export default withWidth()(
  connect(mapStateToProps)(withRouter(Header))
);
