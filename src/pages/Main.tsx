import { Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";
import Background from "../images/background.webp";

export default function Main() {
    const logoFontSize: string = useBreakpointValue({ base: "25px", md: "30px" }) as string;
    const mainFontSize: string = useBreakpointValue({ base: "30px", md: "48px" }) as string;
    const subFontSize: string = useBreakpointValue({ base: "18px", md: "25px" }) as string;
    const leftMargin: string = useBreakpointValue({ base: "50px", md: "100px" }) as string;

    return (
        <Flex w="100vw" h="100vh" >
            <Box w="100vw" h="100vh"
                backgroundImage={`url(${Background})`}
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="cover"
                overflow="hidden"
            >
                <Box
                    pos="fixed"
                    top="35px"
                    left="50px"
                >
                    <Text
                        fontSize={logoFontSize}
                    >
                        InstanTrip
                    </Text>
                </Box>

                <Flex
                    h="91%"
                    alignItems="center"
                >
                    <Flex
                        direction="column"
                        gap="50px"
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