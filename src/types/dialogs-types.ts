export type DialogType = {
    id: number,
    name: string
}
export type DialogsType = {
    dialogs: Array<DialogType>
}

export type MessageType = {
    id: number,
    message: string
}
export type MessagesType = {
    messages: Array<MessageType>
}