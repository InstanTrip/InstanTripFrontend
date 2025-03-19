import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import StatusBar from '@/components/TripSetting/StatusBar';
import TripPeriod from '@/components/TripSetting/TripPeriod';

export default function TripSetting() {
    // 이 페이지는 여행 일정 만들기 초기 설정 페이지임
    // 여행 기간, 떠나고 싶은 지역, 취향 선택 받아야함
    // 여행 기간은 달력으로 선택
    // 떠나고 싶은 지역 선택 최대값은 여행 기간 날짜 만큼

    let [page, setPage] = useState(3); // 페이지 번호(1, 2, 3)

    return (
        <Flex
            w="100vw"
            h="100vh"
            justifyContent="center"
            backgroundColor="#F4F4F4"
            // direction="column"
        >
                
            {/* 1, 2, 3 띄워주는놈 */}
            <Flex
                w="100%"
                h="40px"
                justifyContent="center"
                mt="80px"
                border="1px solid red"
            >
                <StatusBar count={page} />
            </Flex>
            
            <Box
                mt="30px"
            >
                <Text
                    color="#575757"
                >
                    여행 기간 선택
                </Text>
            </Box>
        </Flex>
    );
}