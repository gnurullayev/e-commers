import styles from "./Input.module.css";
import React, { FC } from "react";
import { Input as AntdInput } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import FormItem from "antd/es/form/FormItem";

const { Password } = AntdInput;

type fieldType = true | false;

export interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  size?: "large" | "middle" | "small";
  value?: string;
  defaultValue?: string;
  allowClear?: boolean;
  label?: string;
  rules?: Rule[];
  inputClass?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  hasFeedback?: boolean;
  dependencies?: any[] | undefined;
  name?: (string | number)[] | string | number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  list: fieldType;
  field?: any;
  formItemStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelClass?: any;
}

export const Input: FC<InputProps> = ({
  field,
  name,
  type = "text",
  placeholder = "",
  inputClass = "",
  list = false,
  rules = [],
  label = "",
  disabled,
  required,
  prefix,
  suffix,
  onChange,
  value,
  onBlur,
  allowClear,
  noStyle,
  hasFeedback,
  dependencies,
  initialValue,
  validateTrigger,
  onKeyDown,
  formItemStyle,
  inputStyle,

  labelClass = styles.form__item,
}) => {
  const itemName = list ? [field.name, name] : name;

  return (
    <FormItem
      name={itemName}
      className={labelClass}
      rules={rules}
      initialValue={initialValue}
      label={label}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
      style={formItemStyle}
    >
      {type === "password" ? (
        <Password
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          allowClear={allowClear}
          className={`${styles.auth_input} ${
            styles[inputClass as string]
          } ${inputClass}`}
          style={inputStyle}
        />
      ) : (
        <AntdInput
          type={type}
          placeholder={placeholder}
          className={`${styles.auth_input} ${
            styles[inputClass as string]
          } ${inputClass}`}
          disabled={disabled}
          required={required}
          prefix={prefix}
          suffix={suffix}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          allowClear={allowClear}
          onKeyDown={onKeyDown}
          style={inputStyle}
        />
      )}
    </FormItem>
  );
};
