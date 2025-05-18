import { useState } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

import SideBar from '@/components/Mypage/SideBar';
import Schedule from '@/components/Mypage/Schedule';
import ChangeUserInfo from '@/components/Mypage/ChangeUserInfo';

export default function Mypage() {
    const [page, setPage] = useState("schedule"); // schedule, user_info_edit

    const sideBarWidth = useBreakpointValue({ base: "50px", md: "270px" });
    

    return (
        <Flex
            w="100vw"
            h="100vh"
        >
            {/* 사이드바 */}
            <SideBar page={page} setPage={setPage} />

            {/* 메인 */}
            <Box
                w={`calc(100% - ${sideBarWidth})`}
                h="100vh"
            >
                {
                    page === "schedule" ? (
                        <Box>
                            <Schedule />
                        </Box>
                    ) : page === "user_info_edit" ? (
                        <Box>
                            <ChangeUserInfo />
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