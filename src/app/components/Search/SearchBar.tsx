'use client';

import { useFormContext } from 'react-hook-form';
import { PanelInset } from '../Panel';
import { FaMagnifyingGlass, FaSpinner } from 'react-icons/fa6';
import Button from '../Button';
import { twJoin } from 'tailwind-merge';

export default function SearchBar () {
    const {
        register,
        formState: { isLoading }
    } = useFormContext();
    return (
        <PanelInset
            dark
            className='flex p-1 flex-wrap items-center justify-between mb-0'
        >
            <div className='flex flex-wrap items-center grow'>
                <div className='shrink-0 grow'>
                    <input
                        {...register('searchTerm')}
                        placeholder='Search title...'
                        type='text'
                        className='f-input w-full'
                    />
                </div>
                <div className='mx-4'>
                    <FaSpinner
                        className={twJoin(
                            'animate-spin',
                            !isLoading && 'opacity-0'
                        )}
                    />
                </div>
                <Button green type='submit' className='!justify-center gap-2'>
                    <FaMagnifyingGlass />
                    Search
                </Button>
            </div>
        </PanelInset>
    );
}
