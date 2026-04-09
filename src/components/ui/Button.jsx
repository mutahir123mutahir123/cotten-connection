import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import './Button.css';

const Button = forwardRef(
  ({ className = '', variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={`btn btn--${variant} btn--${size} ${className}`.trim()}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };