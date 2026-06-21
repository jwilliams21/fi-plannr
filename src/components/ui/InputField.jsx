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
    registration, 
    description, 
    ...props }) => {

    const labelVariants = {
        base: 'w-full text-xl'
    }

    const inputVariants = {
        base: 'border-2 border-slate-300 rounded-lg w-full mt-2 p-2 text-lg text-slate-700'
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

            <input className={`${inputVariants[inputVariant]} ${inputClassName}`}
                id={id}
                type={type}
                name={name}
                {...registration}
                {...props}
            />

            {error && <span>{error.message}</span>}

        </div>
    );
};