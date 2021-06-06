// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react'
import '@testing-library/jest-dom'
import {render as rtlrender} from '@testing-library/react'
import 'jest-partial'
import {EndpointContextProvider} from './context/context'

function render(ui, {Endpoint = 'rest', ...options} = {}) {
  const Wrapper = ({children}) => (
    <EndpointContextProvider initialEndpoint={Endpoint}>
      {children}
    </EndpointContextProvider>
  )

  return rtlrender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
export {render}
