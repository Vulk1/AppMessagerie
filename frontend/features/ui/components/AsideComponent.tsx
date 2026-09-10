
type AsideComponentProps = {
    children : React.ReactNode;
    selected?: boolean;
    tooltipText?: string;
}

export default function AsideComponent( {children, selected, tooltipText} : AsideComponentProps) {
    return(
        <div className={`avatar 
            w-full 
            flex 
            justify-center 
            items-center
             ${tooltipText ? `tooltip tooltip-right [--tt-bg:#2c2c30]
            before:text-white
            before:px-3
            before:py-2` : ""}  
            hover:bg-[#6039a3] 
            transition-all duration-200
            rounded-md 
            ${selected ? "bg-[#6039a3]" : "bg-transparent"}`} 
            data-tip={tooltipText ?? ""}>
            <div>
                {children}
            </div>
        </div>
    );
}