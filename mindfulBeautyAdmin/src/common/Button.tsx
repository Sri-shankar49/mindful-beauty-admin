import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonTitle: string;
    buttonType?: "submit" | "reset" | "button"; // Restrict buttonType to allowed values;

}

export const Button: React.FC<ButtonProps> = ({
    buttonTitle,
    buttonType = "submit", // Default to "submit"
    ...rest // Spread the rest of the props
}) => {
    return (
        <div>
            <button
                type={buttonType}
                {...rest}  // Spread the rest props to ensure all standard input props are passed down
            >
                {buttonTitle}
            </button>
        </div>
    )
}
