import type { ButtonProps } from "./interfaces";

const Button = ({ children, className, ...rest }: ButtonProps) => {
  const baseClasses = "w-[64px] h-[32px] px-[16px] py-[8px] cursor-pointer";

  return (
    <button className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
