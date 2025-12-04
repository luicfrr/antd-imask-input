import React, {
  useRef,
  type ReactNode
} from 'react'
import {
  Input,
  InputRef
} from 'antd'
import { useIMask } from 'react-imask'
import IMask, {
  InputMask,
  type FactoryOpts
} from 'imask'

// types
import { MaskedInputProps } from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  defaultValue,
  searchInput,
  maskReturn,
  onChange,
  ref: forwardRef,
  ...props
}: MaskedInputProps ): ReactNode {
  const {
    ref,
    value,
    setValue
  } = useIMask( handleMaskOptions(), {
    onAccept,
    defaultValue
  } )
  const FinalInput = useRef( searchInput ? Input.Search : Input ).current

  function handleMaskOptions(): FactoryOpts {
    const mask = maskOptions.mask
    // check if mask is a string regex
    if (
      typeof mask === 'string' &&
      mask[ 0 ] === '/' &&
      mask[ mask.length - 1 ] === '/'
    ) {
      maskOptions.mask = new RegExp( mask.slice( 1, -1 ) )
    }

    return maskOptions
  }

  function handleClear() {
    setValue( '' )
    onChange?.( {
      target: {
        ...ref.current as HTMLInputElement,
        value: ''
      }
    } )
  }

  function handleRef(
    inputRef: InputRef | null
  ) {
    const input = inputRef?.input
    ref.current = input ?? null

    if ( isEmpty( forwardRef ) ) return
    if ( typeof forwardRef === 'function' ) {
      forwardRef( inputRef )
    } else {
      forwardRef.current = inputRef
    }
  }

  function onAccept(
    _: string,
    mask: InputMask<FactoryOpts>
  ) {
    onChange?.( {
      target: {
        ...ref.current as HTMLInputElement,
        value: maskReturn ? mask.value : mask.unmaskedValue
      }
    } )
  }

  return (
    <FinalInput
      { ...props }
      ref={ handleRef }
      value={ value }
      onChange={ undefined }
      onClear={ handleClear }
    />
  )
}

export default MaskedInput
export { IMask }
