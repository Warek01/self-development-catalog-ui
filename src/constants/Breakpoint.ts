export type BreakpointType = {
  [key in DisplayBreakpoint]: number
}

const Breakpoint: BreakpointType = {
  Sm: 640,
  Md: 768,
  Lg: 1024,
  Xl: 1280,
  '2xl': 1536
}

export default Breakpoint

