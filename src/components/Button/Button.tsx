import type { ButtonProps } from "./interfaces";

const Button = ({ children, className, ...rest }: ButtonProps) => {
  const baseClasses = "w-full h-[64px] items-center cursor-pointer";

  return (
    <button className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
