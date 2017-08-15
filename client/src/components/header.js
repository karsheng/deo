import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import { ToolbarGroup } from "material-ui/Toolbar";
import { Tabs, Tab } from 'material-ui/Tabs' ;
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Snackbar from './snackbar';

const style = {
  appBar: {
    boxShadow: "none",
    padding: "0 16px"
  },
  navButton: {
    color: "white"
  },
  navItem: {
    padding: "0 15px"
  },
  inkBar: {
    display: "none"
  },
  iconBtn: {
    padding: "12px 0",
    width: "36px"
  },
  moreVertIcon: {
    fill: "white"
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
        containerElement={<Link to="/" />}
        onTouchTap={this.handleClose}
      >
        Home
      </MenuItem>,
      <MenuItem
        key={2}
        containerElement={<Link to="/event/browse" />}
        onTouchTap={this.handleClose}
      >
        Events
      </MenuItem>,
      <MenuItem 
        key={3}
        onTouchTap={this.handleClose}
      >
        Results
      </MenuItem>,
      <MenuItem 
        key={4}
        containerElement={<Link to="http://www.deorunner.com/" target="_blank" />}
        onTouchTap={this.handleClose}
      >
        Blog
      </MenuItem>,
      <MenuItem 
        key={5}
        containerElement={<Link to="/contact" />}
        onTouchTap={this.handleClose}
      >
        Contact
      </MenuItem>
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
          {this.renderMenuItems()}
        </Drawer>
      );
    } else {
      // render tabs if screen is not small
      return (
          <Tabs>
            <Tab
              key={1}
              style={style.navItem}
              label="HOME"
              onActive={() => this.props.history.push('/')}
            />
            <Tab
              key={2}
              style={style.navItem}
              label="EVENTS"
              onActive={() => this.props.history.push('/event/browse')}
            />
            <Tab
              key={3}
              style={style.navItem}
              label="RESULTS"
            />
            <Tab
              key={4}
              style={style.navItem}
              label="BLOG"
              containerElement={<Link to="http://www.deorunner.com/" target="_blank" />}
            />
            <Tab
              key={5}
              style={style.navItem}
              label="CONTACT"
              onActive={() => this.props.history.push('/contact')}
            />
            {this.renderSigninSignupTabs()}
          </Tabs>
      );
    }
  }

  renderSigninSignupTabs() {
    if (!this.props.authenticated) {
      return ([
            <Tab
              key={6}
              style={style.navItem}
              label="Sign in"
              containerElement={<Link to="/signin" />}
            />,
            <Tab
              key={7}
              style={style.navItem}
              label="Sign up"
              containerElement={<Link to="/signup" />} 
            />
      ]);  
    }
  }
  
  renderTabsOrMoreVertIcon() {
    const { user } = this.props;
    if (!this.props.authenticated && this.state.isSmallSize) {
      return (
        <ToolbarGroup>
          <Tabs>
            {this.renderSigninSignupTabs()}
          </Tabs>
        </ToolbarGroup>  
      );
    } else {
      if (user && this.props.authenticated) {
        return (
          <IconMenu
            iconButtonElement={<IconButton style={style.iconBtn} iconStyle={style.moreVertIcon}><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
              <MenuItem
                containerElement={<Link to="/profile" />}
                primaryText="Profile"
              />
              <MenuItem
                containerElement={<Link to="/signout" />}
                primaryText="Sign out"
              />
          </IconMenu>
        );
      }
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
          <ToolbarGroup>
            {this.renderNavItems()}
            {this.renderTabsOrMoreVertIcon()}
          </ToolbarGroup>
        </AppBar>
        <Snackbar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.profile
  };
}

export default withWidth()(
  connect(mapStateToProps)(withRouter(Header))
);
