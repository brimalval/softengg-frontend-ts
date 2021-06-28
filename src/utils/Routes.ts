import { Home, Users, Projects, ErrorPage } from "../components";
import HomeIcon from "@material-ui/icons/Home";

export type RouteData = {
    path: string;
    exact?: boolean;
    component: React.FC;
    label?: string;
    navRoute?: boolean;
    icon?: any;
};

export const routes: Array<RouteData> = [
    {
        component: Home,
        path: "/",
        exact: true,
        label: "Home",
        navRoute: true,
        icon: HomeIcon
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
