import React from 'react'

function ProfanityFallback({error, resetErrorBoundary}) {
  return (
    <div className="profanity-fallback">
      <div role="alert">
        <pre>{error.message}</pre>
      </div>
      <button onClick={resetErrorBoundary}>Try Again!</button>
    </div>
  )
}

export {ProfanityFallback}
