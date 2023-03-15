import { useEffect } from 'react'
import displayBreakpoints from '@/constants/displayBreakpoints'
import DisplayBreakpoints from '@/constants/displayBreakpoints'

interface Action {
  breakPoint: DisplayBreakpoints
  callback: EventListenerOrEventListenerObject
  media: MediaQueryList
}

type ActionList = {
  [key in DisplayBreakpoints]?: EventListenerOrEventListenerObject
}

const useResponsiveCallback = (actionsList: ActionList): void => {
  useEffect(() => {
    const actions: Action[] = []

    Object.entries(actionsList).forEach(([breakpoint, callback]) => {
      const media = matchMedia(
        `(width <= ${displayBreakpoints[breakpoint as DisplayBreakpoints]}px)`,
      )

      media.addEventListener('change', callback)

      const action: Action = {
        callback: callback,
        breakPoint: breakpoint as DisplayBreakpoints,
        media: media,
      }

      actions.push(action)
    })

    return () => {
      actions.forEach(({ callback, media }) => {
        media.removeEventListener('change', callback)
      })
    }
  }, [])
}

export default useResponsiveCallback
