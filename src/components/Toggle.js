import React from 'react'
import Toggle from 'react-toggle'
import {useEndpointContext} from '../context/context'

import './toggle.css'

function EndpointToggle() {
  const [endpoint, setEndpoint] = useEndpointContext()

  return (
    <Toggle
      checked={endpoint === 'rest' ? true : false}
      onChange={() =>
        setEndpoint(() => (endpoint === 'rest' ? 'graphql' : 'rest'))
      }
      aria-label="endpoint-toggle"
      icons={{
        checked: 'rest',
        unchecked: 'graphql',
      }}
    />
  )
}

export default EndpointToggle
