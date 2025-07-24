import { WrapperRouteProps } from "../models/wrapper-route";

export const unloggedPages: WrapperRouteProps[] = [];

export const loggedPages: WrapperRouteProps[] = [
    {
        name: 'início',
        route: '/dashboard'
    },
    {
        name: 'meus cartões',
        route: '/cartoes'
    },
];