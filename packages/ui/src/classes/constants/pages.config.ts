import { WrapperRouteProps } from "../models/wrapper-route";

export const unloggedPages: WrapperRouteProps[] = [
    {
        name: 'Sobre',
        route: '/'
    },
    {
        name: 'Serviços',
        route: '/servicos'
    },
];

export const loggedPages: WrapperRouteProps[] = [
    {
        name: 'início',
        route: '/dashboard'
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