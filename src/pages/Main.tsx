import { useState, useEffect, use } from "react";
import { useQuery } from '@tanstack/react-query'
import { Flex, Box, Text, Link, useBreakpointValue } from "@chakra-ui/react";

import { getUserData, logout } from "@/utils/Api";

import Background from "../assets/background.webp";

export default function Main() {
    const [isLogin, setIsLogin] = useState(false); // 로그인 상태

    // 리엑트 쿼리로 로그인 상태 가져오기
    const { data: results, error: loginError } = useQuery({
        queryKey: ["isLogin"],
        queryFn: () => getUserData(),
        enabled: true,
        retry: 0,
    });

    useEffect(() => {
        if (results) {
            if (results.status === 200) {
                setIsLogin(true);
            } else {
                if (isLogin) {
                    alert("로그아웃 되었습니다.");
                }
                setIsLogin(false);
            }
        }
        if (loginError) {
            setIsLogin(false);
        }
    }, [results, loginError]);

    const handleLogout = () => {
        logout();
        // 새로고침
        window.location.reload();
    }

    // 반응형 디자인을 위한 세부 조정

    // 모바일 화면에선 왼쪽(여자 안보이게), 데스크톱 환경에선 중앙으로 배경 이미지 배치
    const background: string = useBreakpointValue({ base: "left", md: "center" }) as string;

    // 로고 반응형
    const logoFontSize: string = useBreakpointValue({ base: "25px", md: "30px" }) as string;
    const logoLeft: string = useBreakpointValue({ base: "25px", md: "50px" }) as string;
    const logoTop: string = useBreakpointValue({ base: "25px", md: "35px" }) as string;

    // 로그인 / 회원가입 반응형
    const loginFontSize: string = useBreakpointValue({ base: "15px", md: "18px" }) as string;
    const loginRight: string = useBreakpointValue({ base: "25px", md: "50px" }) as string;
    const loginTop: string = useBreakpointValue({ base: "30px", md: "40px" }) as string;

    // 메인 텍스트 반응형
    const mainFontSize: string = useBreakpointValue({ base: "30px", md: "48px" }) as string;
    const subFontSize: string = useBreakpointValue({ base: "18px", md: "25px" }) as string;
    const leftMargin: string = useBreakpointValue({ base: "30px", md: "100px" }) as string;
    const textBoxGap: string = useBreakpointValue({ base: "25px", md: "45px" }) as string;
    
    return (
        <Flex w="100vw" h="100vh" >
            <Box w="100vw" h="100vh"
                backgroundImage={`url(${Background})`}
                backgroundRepeat="no-repeat"
                backgroundPosition={background}
                backgroundSize="cover"
                overflow="hidden"
            >
                <Box
                    pos="fixed"
                    top={logoTop}
                    left={logoLeft}
                >
                    <Text
                        fontSize={logoFontSize}
                        color="white"
                    >
                        InstanTrip
                    </Text>
                </Box>


                {
                    isLogin ? (
                        <Flex
                            pos="fixed"
                            top={loginTop}
                            right={loginRight}

                            gap="3px"
                            alignItems="center"
                        >
                            <Link
                                fontSize={loginFontSize}
                                color="white"
                                textDecoration="none"
                                href="/mypage"
                                outline="none"
                                _hover={{
                                    textDecoration: "none",
                                    color: "white",
                                    outline: "none"
                                }}
                            >
                                마이페이지
                            </Link>
                            <Text
                                fontSize={loginFontSize}
                                color="white"
                            >
                                |
                            </Text>
                            <Text
                                fontSize={loginFontSize}
                                color="white"
                                textDecoration="none"
                                outline="none"
                                _hover={{
                                    textDecoration: "none",
                                    color: "white",
                                    outline: "none"
                                }}

                                onClick={handleLogout}
                                cursor="pointer"
                            >
                                로그아웃
                            </Text>
                        </Flex>
                    ) : (
                        <Flex
                            pos="fixed"
                            top={loginTop}
                            right={loginRight}

                            gap="3px"
                            alignItems="center"
                        >
                            <Link
                                fontSize={loginFontSize}
                                color="white"
                                textDecoration="none"
                                href="/oauth2/authorization/cognito?prompt=login"
                                outline="none"
                                _hover={{
                                    textDecoration: "none",
                                    color: "white",
                                    outline: "none"
                                }}
                            >
                                로그인
                            </Link>
                            <Text
                                fontSize={loginFontSize}
                                color="white"
                            >
                                |
                            </Text>
                            <Link
                                fontSize={loginFontSize}
                                color="white"
                                textDecoration="none"
                                href="https://ap-northeast-21vunt4c2x.auth.ap-northeast-2.amazoncognito.com/signup?client_id=3p91g59lqequcb7e3i8j5jfgka&nonce=7Aog-YkHgVbMpHv96xtQok6PxPoYlRPqhj934MgP1QQ&prompt=login&redirect_uri=https://instantrip.ajb.kr/&response_type=code&scope=email+openid+phone"
                                outline="none"
                                _hover={{
                                    textDecoration: "none",
                                    color: "white",
                                    outline: "none"
                                }}
                            >
                                회원가입
                            </Link>
                        </Flex>
                    )
                }

                {/* 메인 텍스트 */}

                <Flex
                    h="90%"
                    alignItems="center"
                >
                    <Flex
                        direction="column"
                        gap={textBoxGap}
                        ml={leftMargin}
                    >
                        <Text
                            fontSize={mainFontSize}
                            color="white"
                        >
                            당신의 여행을 더욱 편하게
                        </Text>
                        <Box>
                            <Link
                                fontSize={subFontSize}
                                color="white"

                                textDecoration="none"
                                href={isLogin ? "/create" : "/oauth2/authorization/cognito?prompt=login"}
        
                                _hover={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            
                                outline="none"
                            >
                                여행 만들러 가기 ⏵
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}