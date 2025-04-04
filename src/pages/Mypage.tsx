import React from 'react';
import { useState } from 'react';
import { Flex, Text, Link, Box, Image } from '@chakra-ui/react';

import SideBar from '@/components/Mypage/SideBar';
import Schedule from '@/components/Mypage/Schedule';

export default function Mypage() {
    const [page, setPage] = useState("schedule"); // schedule, user_info_edit
    

    return (
        <Flex
            w="100vw"
            h="100vh"
        >
            {/* 사이드바 */}
            <SideBar page={page} setPage={setPage} />

            {/* 메인 */}
            <Box
                w="calc(100% - 270px)"
                h="100vh"
            >
                {
                    page === "schedule" ? (
                        <Box
                            w="100%"
                            h="100%"
                        >
                            <Schedule />
                        </Box>
                    ) : page === "user_info_edit" ? (
                        <Box>
                        </Box>
                    ) : (
                        // 404 에러 페이지
                        <Box>
                        </Box>
                    )
                }
            </Box>
        </Flex>
    );
}