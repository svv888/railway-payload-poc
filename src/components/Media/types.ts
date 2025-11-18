import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface ResponsiveWidth {
  breakpoint: string
  width: string // e.g., '100%', '33.33%', '50%'
}

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number // for Payload media
  size?: string // for NextImage only - if provided, overrides responsiveWidths
  src?: StaticImageData // for static media
  videoClassName?: string
  responsiveWidths?: ResponsiveWidth[] // Array of responsive widths for different breakpoints
  maxContainerWidth?: string // Maximum container width (default: "100vw", can be px, vw, etc.)
}
