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
    ...props }) => {

    const labelVariants = {
        base: 'w-full text-lg font-semibold'
    }

    const inputVariants = {
        base: 'w-full text-lg text-slate-800 bg-transparent outline-none placeholder-slate-400'
    }

    return (
        <div className={divClassName}>

            <div className='flex'>
                <label htmlFor={id} className={`${labelVariants[labelVariant]} ${labelClassName}`}>{label}</label>
                <LabelInfo
                    label={label}
                    description={description}
                />
            </div>

            <div className='flex items-center border border-slate-700 rounded-lg px-3 py-2
                focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 
                transition-all duration-200 bg-transparent'>

                {symbolType === 'currency' && (
                    <span className="text-slate-500 font-medium select-none pr-1.5 shrink-0">$</span>
                )}

                <input className={`${inputVariants[inputVariant]} ${inputClassName} w-full bg-transparent outline-none placeholder-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:margin-0 [&::-webkit-inner-spin-button]:margin-0`}
                    id={id}
                    type={type}
                    name={name}
                    {...registration}
                    {...props}
                />

                {symbolType === 'percentage' && (
                    <span className="text-slate-500 font-medium select-none pl-1.5 shrink-0">%</span>
                )}

            </div>


            {error && <span>{error.message}</span>}

        </div>
    );
};