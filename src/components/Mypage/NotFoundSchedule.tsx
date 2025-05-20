import { Flex, Text, Image, useBreakpointValue } from "@chakra-ui/react";

import warning from "../../assets/warning.svg";

export default function NotFoundSchedule() {
    const warningFontSize = useBreakpointValue({ base: "17px", md: "30px" });
    const warningIconSize = useBreakpointValue({ base: "17px", md: "30px" });

    return (
        <Flex
            w="100%"
            h="100vh"

            justifyContent="center"
            alignItems="center"

            gap="12px"
        >
            <Image w={warningIconSize} src={warning} alt="warning" />
            <Text
                fontSize={warningFontSize}
                color="#B1B1B1"
            >
                여행 계획이 없습니다
            </Text>
        </Flex>
    );
}