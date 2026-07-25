import { useState, useEffect } from 'react';
import LabelInfo from '../LabelInfo';


export const InputField = ({ 
    id, 
    name, 
    label, 
    type, 
    error, 
    labelVariant, 
    labelClassName, 
    inputVariant, 
    inputClassName, 
    divClassName, 
    symbolType,
    registration, 
    description,
    labelInfoVariant,
    ...props }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState('');

    const { onBlur: hookFormBlur, onChange: hookFormChange, ref, ...restRegistration } = registration || {};

    const formatWithCommas = (val) => {
        if(!val && val !== 0) {
            return '';
        }
        const num = parseFloat(val);
        if(isNaN(num)) {
            return val;
        }

        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(num);
    }

    useEffect(() => {
        if(props.value !== undefined && !isFocused) {
            setDisplayValue(formatWithCommas(props.value))
        }
    }, [props.value, isFocused]);

    const handleFocus = () => {
        setIsFocused(true);
        if(displayValue) {
            setDisplayValue(displayValue.replace(/,/g, ''))
        }
    }

    const handleBlur = (e) => {
        setIsFocused(false);
        setDisplayValue(formatWithCommas(e.target.value));
        if(hookFormBlur) {
            hookFormBlur(e)
        }
    }


    // Label & Input Variants
    const labelVariants = {
        base: 'w-full text-lg font-semibold'
    }

    const inputVariants = {
        base: 'w-full text-lg text-slate-800 bg-transparent outline-none placeholder-slate-400'
    }

    return (
        <div className={divClassName}>

            <div className='flex pb-1'>
                <label htmlFor={id} className={`${labelVariants[labelVariant]} ${labelClassName}`}>{label}</label>
                <LabelInfo
                    label={label}
                    description={description}
                    variant={labelInfoVariant}
                />
            </div>

            <div className={`flex items-center rounded-lg px-3 py-2
                focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 
                transition-all duration-200 bg-transparent 
                ${error ? 'border border-red-600': 'border border-slate-700'}`}>

                {symbolType === 'currency' && (
                    <span className="text-slate-500 font-medium select-none pr-1.5 shrink-0">$</span>
                )}

                <input className={`${inputVariants[inputVariant]} ${inputClassName} w-full bg-transparent outline-none 
                    placeholder-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:margin-0 
                    [&::-webkit-inner-spin-button]:margin-0`}
                    id={id}
                    type={symbolType === 'currency' && !isFocused ? 'text' : type}
                    name={name}
                    value={displayValue}
                    ref={ref}
                    onFocus={handleFocus}
                    onChange={(e) => {
                        const val = e.target.value
                        setDisplayValue(val);
                        if(hookFormChange) {
                            hookFormChange(e)
                        }
                    }}
                    onBlur={handleBlur}
                    {...restRegistration}
                    {...props}
                />

                {symbolType === 'percentage' && (
                    <span className="text-slate-500 font-medium select-none pl-1.5 shrink-0">%</span>
                )}

            </div>


            {error && (
                <span className='text-red-600 mt-2 font-medium'>{error.message}</span>
            )}

        </div>
    );
};