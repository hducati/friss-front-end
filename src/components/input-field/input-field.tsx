import * as S from './styles'
import { TextFieldProps } from './types'

export const InputField = ({
  label,
  name,
  initialValue = '',
  disabled = false,
  value,
  onChange,
  error,
  ...props
}: TextFieldProps) => {
  return (
    <S.Wrapper error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
}
