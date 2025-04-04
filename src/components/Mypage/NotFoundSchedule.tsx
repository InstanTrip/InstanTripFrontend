import { Flex, Text, Image } from "@chakra-ui/react";

import warning from "../../assets/warning.svg";

export default function NotFoundSchedule() {
    return (
        <Flex
            w="100%"
            h="100%"

            justifyContent="center"
            alignItems="center"
        >
            <Flex
                w="550px"
                h="320px"

                justifyContent="center"
                alignItems="center"

                gap="12px"

                border="1px solid #969696"
            >
                <Image src={warning} alt="warning" />
                <Text
                    fontSize="30px"
                    color="#B1B1B1"
                >
                    생성된 일정이 없습니다
                </Text>
            </Flex>
        </Flex>
    );
}