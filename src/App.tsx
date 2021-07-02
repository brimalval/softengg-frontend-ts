import React, { useEffect, useState } from "react";
/* Static styles, not dependent on theme */
import styles from "./App.module.css";
import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Toolbar,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
    makeStyles,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import {
    Switch,
    NavLink,
    Route,
    useLocation,
    Redirect,
} from "react-router-dom";
import { routes, redirects } from "./utils/Routes";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#7733e8",
            light: "#b16cf0",
            dark: "#5a17ca",
        },
        secondary: {
            main: "#0D324D",
            light: "#9DA2AB",
            dark: "#020202",
        },
    },
});

// Styles that are dependent on the theme
const useStyle = makeStyles({
    activeNav: {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    navMobileList: {
        width: "50vw",
    },
});

const App: React.FC = () => {
    const classes = useStyle();
    const mobile = useMediaQuery(theme.breakpoints.up("sm"));

    const [xsMenuOpen, setXSMenuOpen] = useState(false);

    const toggleXSMenu = () => {
        setXSMenuOpen(!xsMenuOpen);
    };

    // Close the mobile menu if the window switches to a bigger size
    useEffect(() => {
        if (!mobile) setXSMenuOpen(false);
    }, [mobile]);

    const location = useLocation();
    console.log(location);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.home}>
                <AppBar
                    position="static"
                    className={styles.appBar}
                    elevation={0}
                >
                    <Toolbar>
                        <Typography variant="h6" className={styles.navTitle}>
                            Kanban
                        </Typography>
                        <div className={styles.navRight}>
                            <ul className={styles.navLinks}>
                                {mobile ? (
                                    /* Give a tab to all routes that have navRoute set to true*/
                                    routes
                                        .filter((route) => route.navRoute)
                                        .map((route) => (
                                            <li key={`navLink${route.label}`}>
                                                <Button
                                                    style={{
                                                        borderRadius: 0,
                                                    }}
                                                    component={NavLink}
                                                    to={
                                                        route.navPath
                                                            ? route.navPath
                                                            : route.path
                                                    }
                                                    exact
                                                    className={styles.navLink}
                                                    activeClassName={
                                                        classes.activeNav
                                                    }
                                                    color="inherit"
                                                    disableElevation
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        className={
                                                            styles.navLink
                                                        }
                                                    >
                                                        {route.label}
                                                    </Typography>
                                                </Button>
                                            </li>
                                        ))
                                ) : (
                                    /* Burger Menu */
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={toggleXSMenu}
                                        aria-label="toggleDrawer"
                                    >
                                        {xsMenuOpen ? (
                                            <CloseIcon aria-label="closeDrawer" />
                                        ) : (
                                            <MenuIcon aria-label="openDrawer" />
                                        )}
                                    </IconButton>
                                )}
                            </ul>
                        </div>
                    </Toolbar>
                </AppBar>
                <Switch>
                    {redirects.map((redirect) => {
                        return <Redirect {...redirect} />;
                    })}
                    {routes.map((route) => {
                        return <Route key={route.label} {...route} />;
                    })}
                </Switch>
            </div>

            <Drawer anchor="right" open={xsMenuOpen} onClose={toggleXSMenu}>
                <div className={classes.navMobileList}>
                    <List>
                        {routes
                            .filter((route) => route.navRoute)
                            .map((route) => (
                                <React.Fragment key={route.label}>
                                    <ListItem
                                        key={route.label}
                                        selected={
                                            location.pathname === route.path
                                        }
                                        component={NavLink}
                                        to={
                                            route.navPath
                                                ? route.navPath
                                                : route.path
                                        }
                                        onClick={toggleXSMenu}
                                    >
                                        <ListItemText>
                                            <Typography variant="h6">
                                                {route.label}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <Divider key={`div${route.label}`} />
                                </React.Fragment>
                            ))}
                    </List>
                </div>
            </Drawer>
        </ThemeProvider>
    );
};

export default App;
