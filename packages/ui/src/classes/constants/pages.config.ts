import { WrapperRouteProps } from "../models/wrapper-route";

export const unloggedPages: WrapperRouteProps[] = [
    {
        name: 'Conheça o nosso blog',
        route: 'https://bytebank-blog.vercel.app/',
        blank: true
    }
];

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