export function NicknameToHexColor(nickname: string): { color: string; textColor: string } {
    let hash = 0;
    for (let i = 0; i < nickname.length; i++) {
        hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }
    
    // RGB 값 추출
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // 밝기 계산 (YIQ 공식)
    const brightnessValue = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightnessValue > 128 ? 'black' : 'white';

    return { color, textColor };
}
