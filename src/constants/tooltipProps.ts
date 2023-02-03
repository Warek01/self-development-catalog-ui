import type Tooltip from 'rc-tooltip'
import type { ComponentProps } from 'react'

const props: ComponentProps<typeof Tooltip> = {
  overlay: '',
  placement: 'top',
  mouseLeaveDelay: 0,
  mouseEnterDelay: 0.5,
  destroyTooltipOnHide: false,
  trigger: ['hover', 'focus', 'click'],
}

export default props
