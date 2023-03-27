import { ComponentProps, CSSProperties, FC, useContext, useMemo } from 'react'
import Tooltip from 'rc-tooltip'

import { mobileViewContext } from '@/context'
import type { CustomTooltipProps } from './interface'
import Color from '@/constants/Color'
import { useTheme } from '@/lib/hooks'

const CustomTooltip: FC<CustomTooltipProps> = ({
  text,
  children,
  hiddenOnMobile = true,
}) => {
  const theme = useTheme()
  const { isMobile } = useContext(mobileViewContext)

  const tooltipProps = useMemo<ComponentProps<typeof Tooltip>>(
    () => ({
      overlay: '',
      placement: 'top',
      mouseLeaveDelay: 0,
      mouseEnterDelay: 0.5,
      overlayInnerStyle: {
        background: theme.isDark ? Color.DarkBlack : Color.White,
        color: theme.isDark ? Color.DarkWhite : Color.Black,
      } as CSSProperties,
      overlayStyle: {
        background: theme.isDark ? Color.CardBgDark : Color.CardBg,
      } as CSSProperties,
      destroyTooltipOnHide: false,
      trigger: ['hover', 'focus', 'click'],
    }),
    [theme.isDark],
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
