import React, {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type ReactNode
} from 'react'
import { Input } from 'antd'
import IMask, {
  FactoryOpts,
  FactoryReturnMasked
} from 'imask'

// types
import {
  MaskedInputProps,
  OnChangeEvent
} from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  value,
  defaultValue,
  onChange,
  ...props
}: MaskedInputProps ): ReactNode {
  const innerDefaultValue = useRef( ( () => {
    if ( !isEmpty( defaultValue ) ) {
      return defaultValue
    }

    return value ?? ''
  } )() ).current
  const imask = useRef<FactoryReturnMasked<FactoryOpts>>( null )
  const [
    innerValue,
    setInnerValue
  ] = useState( innerDefaultValue )

  useEffect( () => {
    imask.current = IMask.createMask( maskOptions )
  }, [ maskOptions ] )

  useEffect( () => {
    const masked = imask.current
    if ( isEmpty( masked, true ) ) return

    if ( isEmpty( value, true ) ) return

    masked.resolve( value )
    setInnerValue( () => masked.value )
  }, [ value ] )

  function onChangeEvent(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const masked = imask.current
    const target = event.target
    if (
      !masked ||
      !target
    ) return

    masked.resolve( target.value )
    event.target.value = masked.value
    Object.assign( event, {
      maskedValue: masked.value,
      unmaskedValue: masked.unmaskedValue
    } )

    setInnerValue( () => masked.value )
    onChange?.( event as OnChangeEvent )
  }

  return (
    <Input
      { ...props }
      defaultValue={ innerDefaultValue }
      value={ innerValue }
      onChange={ onChangeEvent }
    />
  )
}

export default MaskedInput
export { IMask }
