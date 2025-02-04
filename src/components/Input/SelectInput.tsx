import { useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { GroupBase, Props } from 'react-select';

type SelectInputProps<Option, IsMulti extends boolean = true> = Props<
    Option,
    IsMulti
> & {
    error?: FieldError;
    errorMessage?: Record<string, string>;
};

export default function SelectInput<Option, IsMulti extends boolean = true> ({
    error,
    errorMessage,
    className,
    ...params
}: SelectInputProps<Option, IsMulti>) {
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
            <Select
                {...params}
                className={className}
                aria-invalid={error ? true : false}
                unstyled
                classNames={{
                    indicatorsContainer: () => '',
                    control: () => 'select-button custom-input flex gap-2',
                    placeholder: () => 'text-[#505050] pl-1',
                    menuList: () => 'select-menu-list',
                    multiValue: () => 'select-multi',
                    option: p =>
                        p.isFocused
                            ? 'select-menu-option focused'
                            : 'select-menu-option',
                    groupHeading: () => 'select-menu-group-option'
                }}
                components={{
                    IndicatorsContainer: () => <></>
                }}
            />
            {errorContent}
        </>
    );
}
