import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

interface TasteProps {
    onSelectTaste: (category: string, item: string) => void;
}

export default function TasteProps({onSelectTaste}: TasteProps) {
    const [selectedTastes, setSelectedTastes] = useState<{ [key: string]: Set<string> }>({
        "음식": new Set(),
        "여행지": new Set(),
        "숙소": new Set(),
    })};

const categories = {
    "음식": ['한식', '호프/통닭', '카페', '탕류(보신용)', '분식', '패스트푸드', '양식', '정종/대포집/소주방', '경양식', '횟집'],
    "여행지": ['경치', '정원', '연못', '바다', '숲'],
    "숙소": ['호텔', '모텔'],
}

return (

)