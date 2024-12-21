export function buildImageUrl(imgurId: string, imgurType: string, suffix = 'b') {
    const typeParts = imgurType.split('/');
    return `http://i.imgur.com/${imgurId}${suffix}.${typeParts[1]}`;
}