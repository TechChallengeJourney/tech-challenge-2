import { WrapperRouteProps } from "../models/wrapper-route";

export const unloggedRoutes: WrapperRouteProps[] = [
    {
        name: 'Sobre',
        route: '/'
    },
    {
        name: 'Serviços',
        route: '/servicos'
    },
];

export const loggedRoutes: WrapperRouteProps[] = [
    {
        name: 'início',
        route: '/home'
    },
    {
        name: 'investimentos',
        route: '/investimentos'
    },
    {
        name: 'transferências',
        route: '/transferencias',
        disabled: true
    },
    {
        name: 'outros',
        route: '/outros'
    },
];