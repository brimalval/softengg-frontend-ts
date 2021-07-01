import { Home, Users, Projects, ErrorPage } from "../components";
import HomeIcon from "@material-ui/icons/Home";

/**
 * Interface used for defining the routes that show up in App.tsx
 * 
 * @interface RouteData
 * @member navRoute is a boolean
 * @member navPath is an optional field that will be used if navRoute is set to true.
 * Leaving navPath undefined will cause the nav bar to use path instead
 * @member exact defines whether the route should be matched exactly or allow
 * additional strings to be affixed to the path (ex. matching /home non-exactly
 * will match /home/1234 and /home; setting exact to true will cause /home/1234 to not match)
 */
export type RouteData = {
    path: string;
    /** Defines whether the route should match just the path or also match extra params */
    exact?: boolean;
    /** Component that is rendered by the route */
    component: React.FC;
    /** Label used for the route on the navbar */
    label?: string;
    /** Boolean used to determine whether the route will show up on the navbars */
    navRoute?: boolean;
    icon?: any;
    /** Path used when navRoute is true; if empty, path is used instead */
    navPath?: string;
};

/**
 * Type used for any redirects that should be added
 * 
 * @interface RedirectData
 * @member string from - source of redirect; path to redirect away from
 * @member string to - destination of redirect
 * @member boolean? exact - matches the specified "from" path if true, otherwise
 * also matches extra params
 * 
 */
export type RedirectData = {
    /** Source path */
    from: string;
    /** Matches exact source path or also match source path with extra params */
    exact?: boolean;
    /** Destination path */
    to: string;
};

export const redirects: Array<RedirectData> = [
    {
        from: "/",
        exact: true,
        to: "/home/main"
    },
    {
        from: "/home",
        exact: true,
        to: "/home/main"
    }
]

export const routes: Array<RouteData> = [
    {
        component: Home,
        path: "/home/:sub?",
        label: "Home",
        navRoute: true,
        icon: HomeIcon,
        navPath: "/home/main",
    },
    {
        component: Users,
        path: "/users",
        exact: true,
        label: "Users",
        navRoute: true,
    },
    {
        component: Projects,
        path: "/projects",
        label: "Projects",
        navRoute: true,
    },
    {
        component: ErrorPage,
        path: "/",
        label: "ErrorPage",
    },
];
