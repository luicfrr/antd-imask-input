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
  type FactoryArg
} from 'imask'

type MaskFieldType = string | RegExp | Function | Date | FactoryArg
export type MaskType = MaskFieldType | MaskOptionsList
export type OnChangeEvent = ChangeEvent<HTMLInputElement> & {
  maskedValue: string
  unmaskedValue: string
}

interface MaskOptionsList extends Array<MaskOptions> { }
interface MaskOptions extends Omit<FactoryArg, 'mask'> {
  mask: MaskFieldType
}

export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  ref?: Ref<InputRef>
  mask: MaskType
  definitions?: Definitions
  value?: string
  initialValue?: string
  maskOptions?: FactoryArg
  onChange?: (
    event: OnChangeEvent
  ) => any
  enableLogs?: boolean
}
