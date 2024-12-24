import { ComponentProps, useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

type TextInputProps = ComponentProps<'input'> & {
    error?: FieldError;
    errorMessage?: Record<string, string>;
};

export default function TextInput ({
    error,
    errorMessage,
    className,
    ...params
}: TextInputProps) {
    const errorContent = useMemo(() => {
        if (
            error &&
            errorMessage &&
            Object.keys(errorMessage).includes(error.type)
        ) {
            return (
                <p role='alert' className='text-red-600'>
                    {errorMessage[error.type]}
                </p>
            );
        }
    }, [error, errorMessage]);

    return (
        <>
            <input
                className={twJoin('f-input', className)}
                type='text'
                {...params}
            />
            {errorContent}
        </>
    );
}
