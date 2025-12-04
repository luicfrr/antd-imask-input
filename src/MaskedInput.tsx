import React, {
  useEffect,
  useRef,
  type ReactNode
} from 'react'
import {
  Input,
  InputRef
} from 'antd'
import { useIMask } from 'react-imask'
import IMask, {
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
    setValue,
    unmaskedValue,
    setUnmaskedValue
  } = useIMask( handleMaskOptions(), {
    defaultValue
  } )
  const FinalInput = useRef( searchInput ? Input.Search : Input ).current

  useEffect( () => {
    onChange?.( {
      target: {
        ...ref.current as HTMLInputElement,
        value: maskReturn ? value : unmaskedValue
      }
    } )
  }, [
    value,
    unmaskedValue
  ] )

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
    setUnmaskedValue( '' )
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
