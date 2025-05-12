import React, { useState } from 'react';
import { Box, Button, Text, Wrap, WrapItem } from '@chakra-ui/react';

interface TasteProps {
  onSelectTaste: (category: string, item: string) => void;
}

export default function Taste({ onSelectTaste }: TasteProps) {
  const [selectedTastes, setSelectedTastes] = useState<{ [key: string]: Set<string> }>({
    "음식": new Set(),
    "여행지": new Set(),
    "숙소": new Set(),
  });

  const categories: { [key: string]: string[] } = {
    "음식": ['한식', '호프/통닭', '카페', '탕류(보신용)', '분식', '패스트푸드', '정종/대표집/소주방', '경양식', '횟집', '일식'],
    "여행지": ['경치', '정원', '연못', '바다', '숲'],
    "숙소": ['호텔', '모텔'],
  };

  const toggleTaste = (category: string, item: string) => {
    setSelectedTastes((prev) => {
      const updated = new Set(prev[category]);
      if (updated.has(item)) {
        updated.delete(item);
      } else {
        updated.add(item);
        onSelectTaste(category, item);
      }
      return { ...prev, [category]: updated };
    });
  };

  const isSelected = (category: string, item: string) => {
    return selectedTastes[category]?.has(item);
  };

  return (
    <Box p="20px" border="1px solid #ddd" borderRadius="md" maxW="700px" mx="auto">
      {Object.entries(categories).map(([category, items]) => (
        <Box key={category} mb="28px" textAlign="left">
          <Text fontWeight="bold" fontSize="18px" mb="12px">{category}</Text>
          <Wrap spacing="10px">
            {items.map((item, idx) => (
              <WrapItem key={`${item}-${idx}`}>
                <Button
                  size="sm"
                  variant="solid"
                  borderRadius="8px"
                  backgroundColor={isSelected(category, item) ? '#93E2FF' : '#F4F4F4'}
                  color={isSelected(category, item) ? 'white' : '#575757'}
                  _hover={{ backgroundColor: '#3182ce', color: 'white' }}
                  onClick={() => toggleTaste(category, item)}
                >
                  {item}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ))}
    </Box>
  );
}
