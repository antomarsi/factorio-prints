import Pako from "pako";

export enum ERROR_TYPE {
    USER_NOT_FOUND,
    INVALID_BLUEPRINT,
    INVALID_IMGUR
}


export function buildImageUrl(imgurId: string, imgurType: string, suffix = 'b') {
    const typeParts = imgurType.split('/');
    return `http://i.imgur.com/${imgurId}${suffix}.${typeParts[1]}`;
}

export const imgurRegexValidation = /^https?:\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3,})?$/

export async function getImgurIdType(imgUrl: string): Promise<{ id: string, type: string }> {
    const matches = imgurRegexValidation.exec(imgUrl)
    if (!matches || matches?.length < 2) {
        throw new Error("Not a valid Imgur Url")
    }
    const imgId = matches[2]

    const response = await fetch(`https://api.imgur.com/3/image/${imgId}`)
    const data = await response.json()

    if (data.success == false) {
        throw new Error("Not a valid Imgur Url")
    }

    return {
        id: data.data.id,
        type: data.data.type
    }
}


export function decodeV15Base64(string: string): string {
        const binary: string = atob(string.slice(1));
        const arrayBuffer: Uint8Array = new Uint8Array(new ArrayBuffer(binary.length));
        for (let i = 0; i < binary.length; i++) {
            arrayBuffer[i] = binary.charCodeAt(i);
        }
        
        const unzipped: Uint8Array = Pako.inflate(arrayBuffer);
        return fromCharCode(unzipped);
}

function fromCharCode(bytes: Uint8Array): string {
    let result = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
}
