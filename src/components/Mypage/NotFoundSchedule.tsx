import { Flex, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"

import warning from "../../assets/warning.svg";
import warning_darkmode from "../../assets/warning_for_darkmode.svg";

export default function NotFoundSchedule() {
    const isLightMode = useColorModeValue(true, false);
    const textColor = useColorModeValue("#B1B1B1", "#dddddd");

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
            <Image w={warningIconSize} src={isLightMode ? warning : warning_darkmode} alt="warning" />
            <Text
                fontSize={warningFontSize}
                color={textColor}
            >
                여행 계획이 없습니다
            </Text>
        </Flex>
    );
}