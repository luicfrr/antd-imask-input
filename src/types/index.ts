import {
  type ChangeEvent,
  type Ref
} from 'react'
import {
  type InputProps,
  type InputRef
} from 'antd'
import {
  type Definitions,
  PatternInputDefinition
} from 'imask'

type MaskFieldType = string | RegExp | Function | Date | InputMaskOptions
export type MaskType = MaskFieldType | MaskOptionsList
export type OnChangeEvent = ChangeEvent<HTMLInputElement> & {
  maskedValue: string
  unmaskedValue: string
}

interface MaskOptionsList extends Array<MaskOptions> { }
interface MaskOptions extends Omit<InputMaskOptions, 'mask'> {
  mask: MaskFieldType
}
export type InputMaskOptions = {
  [ K in keyof PatternInputDefinition ]?: PatternInputDefinition[ K ]
}
export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  ref?: Ref<InputRef>
  mask: MaskType
  definitions?: Definitions
  value?: string
  defaultValue?: string
  maskOptions?: InputMaskOptions
  onChange?: (
    event: OnChangeEvent
  ) => any
}
