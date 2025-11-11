import React, {
  useRef,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { Input } from 'antd'
import IMask, {
  FactoryOpts,
  InputMask
} from 'imask'

// types
import { MaskedInputProps } from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  value,
  defaultValue,
  searchInput,
  onChange,
  ...props
}: MaskedInputProps ): ReactNode {
  const imask = useRef<InputMask<FactoryOpts>>( null )
  const innerDefaultValue = useRef( ( () => {
    if ( !isEmpty( defaultValue ) ) {
      return defaultValue
    }

    return value ?? ''
  } )() ).current
  const FinalInput = useRef( searchInput ? Input.Search : Input ).current

  const [
    inputRef,
    setInputRef
  ] = useState<HTMLInputElement | null | undefined>( null )
  const [
    innerValue,
    setInnerValue
  ] = useState( innerDefaultValue )

  useEffect( () => {
    if ( isEmpty( inputRef ) ) return

    imask.current = IMask( inputRef, maskOptions )
    imask.current.on( 'accept', () => {
      const {
        value,
        unmaskedValue
      } = imask.current!

      setInnerValue( () => value )
      onChange?.( {
        maskedValue: value,
        unmaskedValue: unmaskedValue
      } )
    } )

    return () => imask.current?.destroy()
  }, [
    inputRef,
    maskOptions
  ] )

  useEffect( () => {
    const masked = imask.current
    if (
      isEmpty( value, true ) ||
      isEmpty( masked, true )
    ) return

    masked.value = value
  }, [ value ] )

  function handleClear() {
    const masked = imask.current
    if ( isEmpty( masked, true ) ) return

    masked.value = ''
  }

  return (
    <FinalInput
      { ...props }
      ref={ curr => setInputRef( () => curr?.input ) }
      defaultValue={ innerDefaultValue }
      value={ innerValue }
      onClear={ handleClear }
    />
  )
}

export default MaskedInput
export { IMask }
