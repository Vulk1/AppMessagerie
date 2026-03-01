import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { LucideIcon } from "lucide-react"

interface FormInputProps {
  placeholder: string;
  type?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  Icon?: LucideIcon
}


export default function FormInput({
    placeholder,
    type="text",
    error,
    registration,
    Icon
    }: FormInputProps) {

        return (
            <div className="flex flex-col w-full gap-0.5 justify-center">
                <label  className={`input h-14 text-lg input-md w-full bg-[#443061]/30 border-white/30 border-2 backdrop-blur-md ${error ? 'input-error' : ''}`}>
                {Icon && (
                    <Icon className=" w-6 h-6 text-white/70 bg-transparent" />
                )}
                     <input 
                id={registration.name} 
                type={type} 
                {...registration}
                 placeholder={placeholder}
                 className="grow text-white placeholder:text-white/70 bg-transparent"
                 />
                </label>
                {
                error && (
                     <span className="text-error text-sm">{error.message}</span>
                )
                }
                 
            </div>
        );
}