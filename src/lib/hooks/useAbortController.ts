import { useEffect, useMemo, useState } from 'react'

const useAbortController = () => {
  const abortController = useMemo(() => new AbortController(), [])
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  useEffect(() => {
    setIsFirstRender(false)
    return () => {
      if (!isFirstRender) {
        abortController.abort()
      }
    }
  }, [])

  return abortController.signal
}

export default useAbortController
