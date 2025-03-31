import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import StatusBar from '@/components/TripSetting/StatusBar';
// import TripPeriod from '@/components/TripSetting/TripPeriod';
import Calender from '@/components/TripSetting/Calender';
import Area from '@/components/TripSetting/Area';

export default function TripSetting() {
    // 이 페이지는 여행 일정 만들기 초기 설정 페이지임
    // 여행 기간, 떠나고 싶은 지역, 취향 선택 받아야함
    // 여행 기간은 달력으로 선택
    // 떠나고 싶은 지역 선택 최대값은 여행 기간 날짜 만큼

    const [page, setPage] = useState(1); // 페이지 번호(1, 2, 3)
    // const [selectedArea, setSelectedArea] = useState<string | null>(null);

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (page < 3) setPage(page + 1);
    };

    return (
        <Flex
            w="100vw"
            h="100vh"
            justifyContent="center"
            backgroundColor="#F4F4F4"
            direction="column"
            alignItems="center"
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
            
            {/* <Box
                mt="30px"
            >
                <Text
                    color="#575757"
                >
                    여행 기간 선택
                </Text>
            </Box> */}

            {page === 1 && (
                <>
                    <Text color="#575757" mt="30px">
                        여행 기간 선택
                    </Text>
                    <Box mt="20px">
                        <Calender />
                    </Box>
                </>
            )}

            {page === 2 && (
                <>
                    <Text color="#575757" mt="30px">
                        떠나고 싶은 지역
                    </Text>
                    <Box mt="20px">
                        <Area />
                    </Box>
                </>
            )}

            {/* 다음 버튼 */}
            {page < 3 && (
                <Button
                    mt="40px"
                    colorScheme="blue"
                    fontSize="18px"
                    onClick={handleNextPage}
                >
                    다음 ⏵
                </Button>
            )}

            {/* 마지막 페이지임 */}
            {page === 3 && (
                <Button
                    mt="40px"
                    colorScheme="green"
                    fontSize="18px"
                >
                    일정 생성 ⏵
                </Button>
            )}

        </Flex>
    );
}
