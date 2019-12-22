import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import { logout } from '../../actions';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    mobileLinkMenuItem: {
        textDecoration: 'none'
    }
}));

const Header = props => {
    const { isAuthenticated, isAdmin } = props;

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        props.logout();
        props.history.push('/');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/documents" className={classes.mobileLinkMenuItem}>
                    Documents
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to="/profile" className={classes.mobileLinkMenuItem}>
                    Profile
                </Link>
            </MenuItem>
            {isAdmin && (
                <MenuItem>
                    <Link to="/users" className={classes.mobileLinkMenuItem}>
                        Users
                    </Link>
                </MenuItem>
            )}
            {isAdmin && (
                <MenuItem>
                    <Link to="/roles" className={classes.mobileLinkMenuItem}>
                        Roles
                    </Link>
                </MenuItem>
            )}
            <MenuItem>
                <Link to="/dashboard" className={classes.mobileLinkMenuItem}>
                    Dashboard
                </Link>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className="navbar-link">
                        <HomeIcon />
                    </Link>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {isAuthenticated && (
                            <Fragment>
                                <Button color="inherit">
                                    <Link
                                        to="/documents"
                                        className="navbar-link"
                                    >
                                        Documents
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to="/dashboard"
                                        className="navbar-link"
                                    >
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link to="/profile" className="navbar-link">
                                        Profile
                                    </Link>
                                </Button>
                            </Fragment>
                        )}
                        {isAuthenticated && (
                            <Fragment>
                                {isAdmin && (
                                    <Fragment>
                                        <Button color="inherit">
                                            <Link
                                                to="/users"
                                                className="navbar-link"
                                            >
                                                Users
                                            </Link>
                                        </Button>
                                        <Button color="inherit">
                                            <Link
                                                to="/roles"
                                                className="navbar-link"
                                            >
                                                Roles
                                            </Link>
                                        </Button>
                                    </Fragment>
                                )}
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Fragment>
                        )}
                        {!isAuthenticated && (
                            <Fragment>
                                <Button color="inherit">
                                    <Link to="/login" className="navbar-link">
                                        Login / Signup
                                    </Link>
                                </Button>
                            </Fragment>
                        )}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};

Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    logout: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.user.details.roleId === 1
});

export default withRouter(
    connect(mapStateToProps, {
        logout
    })(Header)
);
