export function buildMsgError(data: any) {
    return {
        success: false,
        data: data
    }
}

export function buildMsgResult(data: any) {
    return {
        success: true,
        data: data
    }
}