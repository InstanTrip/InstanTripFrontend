import { useState, useEffect } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import SideBar from '@/components/Mypage/SideBar';
import Schedule from '@/components/Mypage/Schedule';
import ChangeUserInfo from '@/components/Mypage/ChangeUserInfo';

export default function Mypage() {
    const [page, setPage] = useState("schedule"); // schedule, user_info_edit

    const sideBarWidth = useBreakpointValue({ base: "50px", md: "270px" });

    const navigate = useNavigate();

    const goTo404 = () => {
        navigate("/404");
    }

    useEffect(() => {
        if (page !== "schedule" && page !== "user_info_edit") {
            goTo404();
        }
    }, [page]);

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
                        null
                    )
                }
            </Box>
        </Flex>
    );
}