import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
// @ts-expect-error single-spa-react types are not resolved due to package.json exports
import singleSpaReact from 'single-spa-react';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(error: Error) {
    return <div>Erro: {error.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
export default lifecycles;
