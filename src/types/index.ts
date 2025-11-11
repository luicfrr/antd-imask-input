import {
  type Ref,
  type ChangeEvent
} from 'react'
import {
  type InputProps,
  type InputRef
} from 'antd'
import { type FactoryOpts } from 'imask'

export type MaskOptionsType = FactoryOpts
export type OnChangeEvent = Partial<ChangeEvent<HTMLInputElement>> & {
  maskedValue: string
  unmaskedValue: string
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
