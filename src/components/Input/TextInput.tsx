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
            error?.message ||
            (errorMessage &&
                error?.type &&
                Object.keys(errorMessage).includes(error.type))
        ) {
            return (
                <p role='alert' className='text-red-600'>
                    {error?.message ||
                        (errorMessage && errorMessage[error.type])}
                </p>
            );
        }
    }, [error, errorMessage]);

    return (
        <>
            <input
                className={twJoin('f-input', className)}
                type='text'
                aria-invalid={error ? true : false}
                {...params}
            />
            {errorContent}
        </>
    );
}
