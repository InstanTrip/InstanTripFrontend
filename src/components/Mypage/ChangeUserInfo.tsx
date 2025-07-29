import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Flex, Grid, GridItem, Box, Text, Input, Button, Alert, useBreakpointValue } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"
import { AxiosResponse } from 'axios';

import { changeNickname } from '@/utils/Api';

export default function ChangeUserInfo({ userEmail, userName, refetchNickname }: { userEmail: string, userName: string, refetchNickname: () => void }) {
    const navigate = useNavigate();

    const isLightMode = useColorModeValue(true, false);
    const textColor = useColorModeValue("#696969", "#dddddd");

    // 사용자 닉네임
    const [name, setUserName] = useState(userName);
    const [showAlert, setShowAlert] = useState(false);

    const mutation = useMutation<AxiosResponse, Error, string>({
        mutationFn: changeNickname,
        onSuccess: (data: AxiosResponse) => {
            if (data.status === 200) {
                refetchNickname();
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            } else {
                alert("닉네임 변경에 실패했습니다.");
            }
        },
        onError: (error: any) => {
            if (error?.response?.status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            } else {
                alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
            }
        }
    });


    const changeNicknameButton = () => {
        mutation.mutate(name);
    }

    const gotoChangePassword = () => {
        window.open("https://ap-northeast-21vunt4c2x.auth.ap-northeast-2.amazoncognito.com/forgotPassword?client_id=3p91g59lqequcb7e3i8j5jfgka&nonce=WycJNgNJ586dyn3QXXO9Ke1nGImVnk_dSDlUAGnMNrM&prompt=login&redirect_uri=https://instantrip.ajb.kr/mypage&response_type=code&scope=email+openid+phone&state=RqXp1VgRRyIQsqDXTb_4tct45veJtANzRRtq0hdAc_8%3D")
    }


    const isMobile = useBreakpointValue({ base: true, md: false });
    const paddingX = useBreakpointValue({ base: "10px", md: "50px" });
    const titleFontSize = useBreakpointValue({ base: "25px", md: "35px" });
    const gridTitleFontSize = useBreakpointValue({ base: "13px", md: "19px" });
    const gridItemHeight = useBreakpointValue({ base: "50px", md: "80px" });
    const gridBoxPaddingX = useBreakpointValue({ base: "10px", md: "30px" });

    return (
        <Flex
            w="100%"
            h="100%"
            px={paddingX}
            
            justifyContent="center"
        >
            <Box
                w="1000px"
                py="50px"
            >
                <Text
                    fontSize={titleFontSize}
                    color={isLightMode ? "#9B9B9B" : "#dddddd"}
                >
                    회원정보 변경
                </Text>

                <Grid
                    border={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                    borderBottom="none"
                    templateColumns="repeat(5, 1fr)"

                    mt="30px"
                >

                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        h={gridItemHeight}
                        bgColor={isLightMode ? "#E7E7E7" : "#2d2d2d"}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize={gridTitleFontSize}
                                color={isLightMode ? "#6D6767" : "#dddddd"}
                            >
                                EMAIL
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px={gridBoxPaddingX}

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Text>
                                {userEmail}
                            </Text>
                        </Flex>
                    </GridItem>

                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        h={gridItemHeight}
                        bgColor={isLightMode ? "#E7E7E7" : "#2d2d2d"}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize={gridTitleFontSize}
                                color={isLightMode ? "#6D6767" : "#dddddd"}

                                textAlign="center"
                            >
                                비밀번호 변경
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px={gridBoxPaddingX}

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Button
                                bgColor={isLightMode ? "#93E2FF" : "#4682B4"}

                                outline="none"
                                border="none"

                                _hover={{
                                    bgColor: isLightMode ? "#7CC4E5" : "#3b709b",
                                }}
                                _focus={{
                                    outline: "none"
                                }}

                                transition="all 0.3s ease-in-out"

                                onClick={gotoChangePassword}
                            >
                                <Text
                                    color="white"
                                >
                                    비밀번호 변경하기
                                </Text>
                            </Button>
                        </Flex>
                    </GridItem>

                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        h={gridItemHeight}
                        bgColor={isLightMode ? "#E7E7E7" : "#2d2d2d"}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize={gridTitleFontSize}
                                color={isLightMode ? "#6D6767" : "#dddddd"}
                            >
                                닉네임
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                        colSpan={4}
                    >
                        <Flex
                            w="100%"

                            px={gridBoxPaddingX}

                            flexDirection="column"
                            justifyContent="center"

                            h="100%"
                        >
                            <Flex
                                w="100%"
                                alignItems="center"

                                gap="10px"
                            >
                                <Input
                                    placeholder="닉네임을 입력하세요"
                                    value={name}
                                    onChange={(e) => setUserName(e.target.value)}
                                    border={isLightMode ? "1px solid #BCBCBC" : "1px solid #2d2d2d"}
                                    borderRadius="10px"
                                    w="100%"
                                />
                                <Button
                                    bgColor={isLightMode ? "#93E2FF" : "#4682B4"}
                                    outline="none"
                                    border="none"

                                    _hover={{
                                        bgColor: isLightMode ? "#7CC4E5" : "#3b709b",
                                    }}
                                    _focus={{
                                        outline: "none"
                                    }}

                                    px={isMobile ? "3px" : "15px"}

                                    transition="all 0.3s ease-in-out"
                                    h="100%"

                                    onClick={changeNicknameButton}
                                >
                                    <Text
                                        color="white"
                                        fontSize={isMobile ? "12px" : "16px"}
                                    >
                                        변경하기
                                    </Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>

            <Box
                position="fixed"
                top={showAlert ? "20px" : "-100px"}
                // 중앙
                left="50%"
                transform="translateX(-50%)"

                zIndex="toast"
                maxWidth="400px"
                transition="all 0.2s ease-in-out"
            >
                <Alert.Root status="success">
                    <Alert.Indicator />
                    <Alert.Title>닉네임이 변경되었습니다</Alert.Title>
                </Alert.Root>
            </Box>
        </Flex>
    );
}