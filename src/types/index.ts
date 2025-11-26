import {
  type Ref,
} from 'react'
import {
  type InputProps,
  type InputRef
} from 'antd'
import {
  type FactoryOpts,
  type InputMaskElement
} from 'imask'

export type MaskOptionsType = FactoryOpts
export type OnChangeEvent = {
  maskedValue: string
  unmaskedValue: string
  target: InputMaskElement | null
}

export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  searchInput?: boolean
  maskOptions: MaskOptionsType
  ref?: Ref<InputRef>
  value?: string
  defaultValue?: string
  onChange?: (
    event: OnChangeEvent
  ) => any
}
