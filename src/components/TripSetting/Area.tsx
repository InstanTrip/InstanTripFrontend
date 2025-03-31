import React, { useState } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';

const areas = {
    "특별시": ["서울", "부산", "광주", "대구", "대전", "인천", "울산", "세종"],
    "경기도": ["가평", "남양주", "양평", "광주(경기)", "여주"]
};

export default function Area() {
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const handleSelectArea = (area: string) => {
        setSelectedArea(area);
    };

    return (
        <Box textAlign="center" pb="20px">
            <Text fontSize="lg" color="#575757" mb="10px">
                떠나고 싶은 지역
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap="15px">
                {areas.map((area) => (
                    <Button
                        key={area}
                        colorScheme={selectedArea === area ? "blue" : "gray"}
                        variant="solid"
                        onClick={() => handleSelectArea(area)}
                    >
                        {area}
                    </Button>
                ))}
            </Grid>
        </Box>
    );
}
