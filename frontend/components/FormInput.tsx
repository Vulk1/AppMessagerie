import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}


export default function FormInput({
    label,
    placeholder,
    type="text",
    error,
    registration
    }: FormInputProps) {

        return (
            <div className="flex flex-col w-full gap-1 justify-center">
                <label htmlFor={registration.name} className="font-medium">{label}</label>
                <input 
                id={registration.name} 
                type={type} 
                {...registration}
                 placeholder={placeholder}
                 className={`input input-md w-full ${error ? 'input-error' : ''}`}
                 />
                 <div>
                    {error && (
                        <span className="text-error text-sm">{error.message}</span>
                    )}
                 </div>
            </div>
        );
}