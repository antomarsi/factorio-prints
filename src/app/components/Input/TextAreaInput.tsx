import { ComponentProps, useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

type TextAreaInputProps = ComponentProps<'textarea'> & {
    error?: FieldError;
    errorMessage?: Record<string, string>;
};

export default function TextAreaInput ({
    error,
    errorMessage,
    className,
    ...params
}: TextAreaInputProps) {
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
            <textarea
                className={twJoin('f-input w-full h-[8.1em]', className)}
                {...params}
                maxLength={params.maxLength || 600}
            />
            {errorContent}
        </>
    );
}
