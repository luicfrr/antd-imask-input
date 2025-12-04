import {
  type Ref,
} from 'react'
import {
  type InputProps,
  type InputRef
} from 'antd'
import {
  type FactoryOpts
} from 'imask'

export type MaskOptionsType = FactoryOpts
export type OnChangeEvent = {
  target: HTMLInputElement
}

export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  /** Returned value should be masked? */
  maskReturn?: boolean
  searchInput?: boolean
  maskOptions: MaskOptionsType
  ref?: Ref<InputRef>
  value?: never
  defaultValue?: string
  onChange?: (
    event: OnChangeEvent
  ) => any
}
