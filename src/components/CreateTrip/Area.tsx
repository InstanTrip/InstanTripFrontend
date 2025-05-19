import React from 'react';
import { Flex, Button, Grid, Text, useBreakpointValue } from '@chakra-ui/react';

import areas from '@/data/areas.json';

export default function Area({ tripPeriod, selectedAreas, setSelectedAreas }: { tripPeriod: number, selectedAreas: string[], setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>> }) {
    const handleSelectArea = (region: string, area: string) => {
        let ar = region + " " + area;
        if (region === "특별/광역시") {
            // 특별/광역시는 지역명만 추가
            ar = area;
        }
        if (selectedAreas.includes(ar)) {
            // 이미 선택된 경우 제거
            setSelectedAreas(selectedAreas.filter((item) => item !== ar));
        } else {
            // 선택되지 않은 경우 추가
            setSelectedAreas([...selectedAreas, ar]);
        }
    };

    const isInclude = (region: string, area: string) => {
        let ar = region + " " + area;
        if (region === "특별/광역시") {
            // 특별/광역시는 지역명만 추가
            ar = area;
        }
        return selectedAreas.includes(ar);
    }

    const lineLen = useBreakpointValue({ base: 3, md: 4, lg: 5 });
    const itemWidth = useBreakpointValue({ base: "100px", md: "150px" });
    const itemGap = useBreakpointValue({ base: "5px", md: "15px" });
    const itemFontSize = useBreakpointValue({ base: "13px", md: "16px" });

    return (
        <Flex
            direction="column"

            gap="20px"
        >
            {Object.entries(areas).map(([region, cities]) => (
                <Flex
                    key={region}
                    direction="column"
                    alignItems="center"
                >
                    <Text fontWeight="bold" fontSize="18px" mb="16px">
                        {region}
                    </Text>
                    
                    <Grid templateColumns={`repeat(${lineLen}, 1fr)`} gap={itemGap} justifyItems="center">
                        {cities.map((city, idx) => (
                            <Button
                                key={`${city}-${idx}`} // 중복된 도시명 방지
                                onClick={() => handleSelectArea(region, city)}
                                backgroundColor={isInclude(region, city) ? "#93E2FF" : "#E9ECF0"}
                                color={isInclude(region, city) ? "white" : "#575757"}
                                borderRadius="12px"
                                width={itemWidth}
                                fontSize={itemFontSize}

                                border="none"
                                outline="none"

                                px="10px"
                                py="16px"

                                transition="all 0.2s ease-in-out"
                                _hover={{ backgroundColor: "#93E2FF", color: "white", outline: "none" }}
                                _focus={{
                                    border: "none",
                                    outline: "none",
                                }}

                                disabled={selectedAreas.length >= tripPeriod && !isInclude(region, city)}
                                cursor={selectedAreas.length >= tripPeriod && !isInclude(region, city) ? "not-allowed" : "pointer"}

                            >
                                {city}
                            </Button> 
                        ))}
                    </Grid>
                </Flex>
            ))}
        </Flex>
    );
}

