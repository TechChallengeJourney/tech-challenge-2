import {FC, lazy} from 'react';

const BytebankExtract = lazy(() =>
  // @ts-ignore
  import('transactions/components').then((module) => ({
    default: module.default || module.BytebankExtract,
  })).catch((error) => {
    console.error(error)
  })
);

const BytebankWidgetDrawer: FC<{ openDrawer: boolean; onClose: () => void; }> = lazy(() =>
  // @ts-ignore
  import('investments/components').then((module) => ({
    default: module.default || module.BytebankWidgetDrawer,
  })).catch((error) => {
    console.error(error)
  })
);

const BytebankGeneralCardsWidget: FC = lazy(() =>
  // @ts-ignore
  import('investments/components').then((module) => ({default: module.default || module.BytebankGeneralCardsWidget})).catch((error) => {
    console.error(error)
  })
);

const BytebankFinancialStatusWidget: FC<{userId?: string}> = lazy(() =>
  // @ts-ignore
  import('investments/components').then((module) => ({
    default: module.default ||module.BytebankFinancialStatusWidget,
  })).catch((error) => {
    console.error(error)
  })
);

const BytebankMonthlyResumeWidget: FC<{userId?: string}> = lazy(() =>
  // @ts-ignore
  import('investments/components').then((module) => ({
      default: module.default ||module.BytebankMonthlyResumeWidget
    }
  )).catch((error) => {
    console.error(error)
  })
);

const BytebankAnalyticsWidget: FC<{userId?: string}> = lazy(() =>
  // @ts-ignore
  import('investments/components').then((module) => ({
      default: module.default || module.
      BytebankAnalyticsWidget
    })).catch((error) => {
    console.error(error)
  })
);

export {
  BytebankExtract,
  BytebankWidgetDrawer,
  BytebankGeneralCardsWidget,
  BytebankFinancialStatusWidget,
  BytebankMonthlyResumeWidget,
  BytebankAnalyticsWidget
};