
type AsideComponentProps = {
    children : React.ReactNode;
    hoverMarker?: boolean;
    tooltipText?: string;
    className?: string;
    onClick?: () => void;
}

export default function AsideComponent( {children, hoverMarker=true, tooltipText, className, onClick} : AsideComponentProps) {
    return(
        <div className={`
            avatar 
            w-10 
            h-10 
            md:w-12 
            md:h-12
            flex 
            justify-center 
            items-center
            cursor-pointer
             ${tooltipText ? `tooltip tooltip-right [--tt-bg:#2c2c30]
            before:text-white
            before:px-3
            before:py-2` : ""}  
            transition-all duration-200
            rounded-md 
            bg-[#222225]
            ${hoverMarker ? "hover:bg-[#6039a3] " : ""}
            ${className}
            `} 
            data-tip={tooltipText ?? ""}
            onClick={onClick}
        >
            {children}
        </div>
    );
}