export enum ResultCodes {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    Captcha = 10
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}

/*
export type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha,
    messages: Array<string>,
    data: {
        userId: number
    }
}
export type LogoutResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: { }
}*/
