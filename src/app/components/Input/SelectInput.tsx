import { ComponentProps, useMemo } from 'react';
import { FieldError, Merge } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';
import Select, { GroupBase, Props } from 'react-select';

type SelectInputProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group> & {
    error?: FieldError;
    errorMessage?: Record<string, string>;
};


export default function SelectInput<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> ({
    error,
    errorMessage,
    className,
    ...params
}: SelectInputProps<Option, IsMulti, Group>) {
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
                    indicatorsContainer: () => "",
                    control: () => "select-button custom-input flex gap-2",
                    placeholder: () => "text-[#505050] pl-1",
                    menuList: () => "select-menu-list",
                    multiValue: () => "select-multi",
                    option: (p) => p.isFocused ? "select-menu-option focused" : "select-menu-option",
                    groupHeading: () => "select-menu-group-option"
                }}
                components={{
                    IndicatorsContainer: () => <></>
                }}
            />
            {errorContent}
        </>
    );
}
