import { WidgetKey } from "./widgets";

export interface User {
    _id: string;
    name: string;
    email: string;
    selectedWidgets: WidgetKey[];
    password?: string;
    document: string
    image: string
    selectedWidgets: WidgetKey[]
}

enum WidgetKey {
    MostExpensiveCategory = 'mostExpensiveCategory',
    HighestIncome = 'highestIncome',
    DailyAverage = 'dailyAverage',
    MonthlySummary = 'monthlySummary',
    FinancialAnalysis = 'financialAnalysis',
    FinancialStatus = 'financialStatus',
}