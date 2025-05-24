import { Box, Flex, Heading, Text, Button, VStack, Image, useBreakpointValue } from '@chakra-ui/react';

import River from '@/assets/river.webp';

const NotFoundPage = () => {
    const pxValue: string = useBreakpointValue({ base: "30px", md: "100px" }) as string;

    return (
        <Flex
            h="100vh"
            w="100vw"
            position="relative"
            overflow="hidden"
            alignItems="center"
            bgGradient="linear(to-br, teal.400 0%, blue.700 100%)"

            px={pxValue}
        >
            {/* 배경 이미지 */}
            <Image
                src={River}
                alt="Sea background"
                position="absolute"
                top={0}
                left={0}
                w="100vw"
                h="100vh"
                objectFit="cover"
                zIndex={0}
                opacity={0.6}
                filter="blur(2px) brightness(0.9)"
            />

            {/* 오버레이 */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100vw"
                h="100vh"
                bgGradient="linear(to-br, rgba(0, 128, 128, 0.4), rgba(0, 64, 255, 0.3))"
                zIndex={1}
            />

            {/* 카드 콘텐츠 */}
            <VStack
                gap={8}
                px={10}
                py={12}
                bg="rgba(255,255,255,0.15)"
                borderRadius="2xl"
                backdropFilter="blur(8px)"
                zIndex={2}
                maxW="lg"
            >
                <Heading
                    fontSize="7xl"
                    fontWeight="extrabold"
                    color="whiteAlpha.900"
                    letterSpacing="wider"
                >
                    404
                </Heading>
                <Text fontSize="2xl" fontWeight="semibold" color="whiteAlpha.900">
                    파도에 휩쓸려 페이지를 찾지 못했어요!
                </Text>
                <Text fontSize="md" color="whiteAlpha.800" maxW="md">
                    요청하신 페이지가 바다 어딘가로 사라진 것 같아요.<br />
                    멋진 계획을 세우러 홈으로 돌아가 볼까요?
                </Text>
                <Button
                    size="lg"
                    borderRadius="md"
                    px={8}
                    fontWeight="bold"
                    color="white"

                    border="1px solid #ffffff70"
                    outline="none"
                    bg="transparent"
                    onClick={() => window.location.href = '/'}
                    _hover={{
                        bg: "#ffffff20",
                        border: "1px solid #ffffff70",
                        outline: "none",
                    }}
                    _focus={{
                        outline: "none",
                    }}

                    transition="all 0.2s ease-in-out"
                >
                    홈으로 돌아가기
                </Button>
            </VStack>
        </Flex>
    );
};

export default NotFoundPage;
