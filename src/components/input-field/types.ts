import { InputHTMLAttributes } from "react"

export type TextFieldProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
} & InputHTMLAttributes<HTMLInputElement>
