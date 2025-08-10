import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

import { getUserData, getNickname } from '@/utils/Api';

import SideBar from '@/components/Mypage/SideBar';
import Schedule from '@/components/Mypage/Schedule';
import ChangeUserInfo from '@/components/Mypage/ChangeUserInfo';
import ServiceInfo from '@/components/Mypage/ServiceInfo';

export default function Mypage() {
    const [page, setPage] = useState("schedule"); // schedule, user_info_edit, service_info
    const navigate = useNavigate();

    const [ userEmail, setUserEmail ] = useState("");
    const [ userName, setUserName ] = useState("");
    
    const sideBarWidth = useBreakpointValue({ base: "50px", md: "270px" });

    const goTo404 = () => {
        navigate("/404");
    }

    useEffect(() => {
        if (page !== "schedule" && page !== "user_info_edit" && page !== "service_info") {
            goTo404();
        }
    }, [page]);

    // 로그인 체크
    const { data: results, error: loginError } = useQuery({
        queryKey: ["isLogin"],
        queryFn: () => getUserData(),
        retry: 0,
    });

    useEffect(() => {
        if (results) {
            console.log("로그인 상태:", results.status);
            if (results.status !== 200) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            } else if (results.status === 200) {
                // 로그인 확인될 경우 사용자 이메일 저장
                setUserEmail(results.data.email);
            }
        }
        if (loginError) {
            // Check if loginError has a 'status' property
            if (typeof (loginError as any).status === 'number' && (loginError as any).status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            }
        }
    }, [results, loginError, navigate]);

    // 사용자 닉네임 가져오기
    const { data: nicknameData, isLoading: isNicknameLoading, error: nicknameError, refetch: refetchNickname } = useQuery({
        queryKey: ['nickname'],
        queryFn: () => getNickname(),
        enabled: !!userEmail, // userEmail이 있을 때만 실행
        retry: 0,
    });
    useEffect(() => {
        if (nicknameData) {
            setUserName(nicknameData.data.nickname);
        }
        if (nicknameError) {
            console.error("닉네임 가져오기 실패:", nicknameError);
        }
    }, [nicknameData, nicknameError]);


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
                            <ChangeUserInfo
                                userEmail={userEmail}
                                userName={userName}
                                refetchNickname={refetchNickname}
                            />
                        </Box>
                    ) : page === "service_info" ? (
                        <Box>
                            <ServiceInfo />
                        </Box>
                    ) : (
                        null
                    )
                }
            </Box>
        </Flex>
    );
}