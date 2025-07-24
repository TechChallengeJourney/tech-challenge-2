import { WidgetKey } from "./widgets";

export interface User {
    _id: string;
    name: string;
    email: string;
    selectedWidgets: WidgetKey[];
    password?: string;
}