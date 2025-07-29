import {
  type ChangeEvent,
  type Ref
} from 'react'
import {
  type InputProps,
  type InputRef
} from 'antd'
import { type FactoryOpts } from 'imask'

export type MaskOptionsType = FactoryOpts
export type OnChangeEvent = ChangeEvent<HTMLInputElement> & {
  maskedValue: string
  unmaskedValue: string
}

export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  maskOptions: MaskOptionsType
  ref?: Ref<InputRef>
  value?: string
  defaultValue?: string
  onChange?: (
    event: OnChangeEvent
  ) => any
}
