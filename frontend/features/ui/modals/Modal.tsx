type ModalProps = {
    id: string;
    title?: string;
    children: React.ReactNode;
    onClose?: () => void;
};

export default function Modal({
    id,
    title,
    children,
    onClose
}: ModalProps) {
    return (
        <dialog id={id}
        className="modal"
        onClose={onClose}>
            <div className="modal-box">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

                {title && (
                    <h3 className="font-bold text-2xl mb-4 flex justify-center">
                        {title}
                    </h3>
                )}

                {children}

            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}