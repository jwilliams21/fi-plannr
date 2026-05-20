

export const InputField = ({ id, label, type, error, labelVariant, labelClassName, inputVariant, inputClassName, divClassName, prefix, registration, ...props }) => {

    const labelVariants = {
        base: "w-3/4 text-xl"
    }

    const inputVariants = {
        base: "border-2 border-slate-300 rounded-lg w-3/4 mt-2 p-2 text-lg text-slate-700"
    }

    return (
        <div className={divClassName}>
            <label htmlFor={id} className={`${labelVariants[labelVariant]} ${labelClassName}`}>{label}</label>

            <div>
                {prefix && (
                    <span className="text-slate-700 text-2xl mr-2">
                        {prefix}
                    </span>
                )}
                <input className={`${inputVariants[inputVariant]} ${inputClassName}`}
                    id={id}
                    type={type}
                    {...registration}
                    {...props}
                />
            </div>

            {error && <span>{error.message}</span>}
        </div>
    );
};