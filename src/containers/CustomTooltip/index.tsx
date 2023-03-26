import { ComponentProps, CSSProperties, FC, useContext, useMemo } from 'react'
import Tooltip from 'rc-tooltip'

import { mobileViewContext, themeContext } from '@/context'
import type { CustomTooltipProps } from './interface'
import Color from '@/constants/Color'

const CustomTooltip: FC<CustomTooltipProps> = ({
  text,
  children,
  hiddenOnMobile = true,
}) => {
  const { isMobile } = useContext(mobileViewContext)
  const { isDark } = useContext(themeContext)

  const tooltipProps = useMemo<ComponentProps<typeof Tooltip>>(
    () => ({
      overlay: '',
      placement: 'top',
      mouseLeaveDelay: 0,
      mouseEnterDelay: 0.5,
      overlayInnerStyle: {
        background: isDark ? Color.DarkBlack : Color.White,
        color: isDark ? Color.DarkWhite : Color.Black,
      } as CSSProperties,
      overlayStyle: {
        background: isDark ? Color.CardBgDark : Color.CardBg,
      } as CSSProperties,
      destroyTooltipOnHide: false,
      trigger: ['hover', 'focus', 'click'],
    }),
    [isDark],
  )

  return hiddenOnMobile && isMobile ? (
    <div>{children}</div>
  ) : (
    <Tooltip
      {...tooltipProps}
      overlay={text}
    >
      <div>{children}</div>
    </Tooltip>
  )
}

export default CustomTooltip
