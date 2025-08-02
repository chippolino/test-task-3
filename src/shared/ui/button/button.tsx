import cn from "classnames";
import type { ButtonHTMLAttributes, PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

export const Button = forwardRef(
  (props: ButtonProps, ref?: Ref<HTMLButtonElement>) => {
    const { children, className, ...rest } = props;

    return (
      <button className={cn(styles.button, className)} ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
