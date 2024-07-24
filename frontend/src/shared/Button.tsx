import className from 'classnames';
import { GoSync } from 'react-icons/go';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    warning?: boolean;
    danger?: boolean;
    outline?: boolean;
    rounded?: boolean;
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    loading,
    ...rest
}) => {
    const classes = className(
        rest.className,
        'flex items-center px-3 py-1.5 h-8 rounded mx-0 my-2 py-8 px-2 w-72 justify-center font-bold',
        {
            'opacity-80': loading,
            'border-black-500 bg-neutral-950 text-white rounded-sm hover:bg-neutral-800': primary,
            'border-black-900 bg-zinc-100 text-black hover:bg-neutral-200': secondary,
            'border-green-500 bg-green-500 text-white': success,
            'border-yellow-400 bg-yellow-400 text-white': warning,
            'border-red-500 bg-red-500 text-white': danger,
            'rounded-full': rounded,
            'bg-white': outline,
            'text-blue-500': outline && primary,
            'text-gray-900': outline && secondary,
            'text-green-500': outline && success,
            'text-yellow-400': outline && warning,
            'text-red-500': outline && danger,
        }
    );

    // Check variation values
    const variationCount = [primary, secondary, success, warning, danger].filter(Boolean).length;
    if (variationCount > 1) {
        console.error('Only one of primary, secondary, success, warning, danger can be true');
    }

    return (
        <button {...rest} disabled={loading} className={classes}>
            {loading ? <GoSync className="animate-spin" /> : children}
        </button>
    );
};

export default Button;
