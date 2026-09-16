import { MessageDTO } from "@/types/chat.types";


export default function MessageItem({
    message,
}:{
    message: MessageDTO;
}) {
    return (
        <div className="flex w-full h-20">
            {message.content} de {message.sender.username}
        </div>
    );
}