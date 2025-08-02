import cn from "classnames";
import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import s from "./input.module.scss";
import clearIcon from "../../assets/icons/clear-icon.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightSection?: ReactNode;
  leftSection?: ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      rightSection,
      leftSection,
      onClear,
      value,
      allowClear,
      onChange,
      ...props
    },
    ref,
  ) => {
    const showClearButton = allowClear && value && String(value).length > 0;
    return (
      <label className={cn(s.label)}>
        {rightSection}
        <input
          ref={ref}
          {...props}
          value={value}
          onChange={onChange}
          className={cn(s.input, className)}
          type={type}
        />

        {showClearButton && (
          <span className={s.clear} onClick={onClear}>
            <img src={clearIcon} alt="clear icon" />
          </span>
        )}
        {leftSection}
      </label>
    );
  },
);

Input.displayName = "Input";
