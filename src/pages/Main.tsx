import { Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";
import Background from "../images/background.webp";

export default function Main() {
    const background: string = useBreakpointValue({ base: "left", md: "center" }) as string;

    const logoFontSize: string = useBreakpointValue({ base: "25px", md: "30px" }) as string;
    const logoLeft: string = useBreakpointValue({ base: "25px", md: "50px" }) as string;
    const logoTop: string = useBreakpointValue({ base: "25px", md: "35px" }) as string;

    const loginFontSize: string = useBreakpointValue({ base: "15px", md: "15px" }) as string;
    const loginRight: string = useBreakpointValue({ base: "25px", md: "50px" }) as string;
    const loginTop: string = useBreakpointValue({ base: "30px", md: "40px" }) as string;

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
                    >
                        InstanTrip
                    </Text>
                </Box>

                <Box
                    pos="fixed"
                    top={loginTop}
                    right={loginRight}
                >
                    <Text
                        fontSize={loginFontSize}
                    >
                        로그인 | 회원가입
                    </Text>
                </Box>

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
                        >
                            당신의 여행을 더욱 편하게
                        </Text>
                        <Text
                            fontSize={subFontSize}
                        >
                            여행 만들러 가기 ⏵
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}