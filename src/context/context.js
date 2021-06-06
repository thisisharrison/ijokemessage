import React from 'react'

const EndpointContext = React.createContext()

function EndpointContextProvider(props) {
  const [endPoint, setEndpoint] = React.useState('graphql')
  return <EndpointContext.Provider value={[endPoint, setEndpoint]} {...props} />
}

function useEndpointContext() {
  const context = React.useContext(EndpointContext)
  if (!context) {
    throw new Error(
      'useEndpointContext must be used within EndpointContextProvider',
    )
  }
  return context
}

export {EndpointContextProvider, useEndpointContext}
