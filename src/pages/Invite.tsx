import { use, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Flex, Box, VStack, Heading, Image, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getUserData, acceptInvite } from '@/utils/Api';

import InviteBackground from '@/assets/invite_background.webp';

export default function Invite() {
    const navigate = useNavigate();
    
    // URL에서 id 파라미터 가져오기
    const [ searchParams ] = useSearchParams();
    const code = searchParams.get('code');

    // 초대 코드가 없으면 404 페이지로 리다이렉트
    useEffect(() => {
        if (!code) {
            navigate('/404', { replace: true });
        }
    }, [code, navigate]);


    // 로그인 체크
    const { data: results , isLoading: isLoading, error: routeError, refetch: refetchRouteData } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(),
        retry: 0,
    });

    useEffect(() => {
        if (results) {
            console.log("로그인 상태:", results.status);
            if (results.status !== 200) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            }
        }
        if (routeError) {
            // Check if routeError has a 'status' property
            if (typeof (routeError as any).status === 'number' && (routeError as any).status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            }
        }
    }, [results, routeError, navigate]);


    const pxValue: string = useBreakpointValue({ base: "30px", md: "100px" }) as string;

    // 초대 수락 쿼리
    const { data: inviteData, isLoading: isInviteLoading, error, refetch: refetchInvite } = useQuery({
        queryKey: ['acceptInvite', code],
        queryFn: () => acceptInvite(code as string),
        enabled: false, // 초기에는 실행하지 않음
    });

    const joinTrip = () => {
        refetchInvite();
    }

    useEffect(() => {
        if (inviteData) {
            console.log("초대 수락 결과:", inviteData);
            if (inviteData.status === 200) {
                navigate(`/aboutrip?id=${inviteData.data.plan_id}`, { replace: true });
            } else {
                console.error("초대 수락 실패:", inviteData);
            }
        }
    }, [inviteData, navigate]);

    return (
        <Flex
            w="100vw"
            h="100vh"
            position="relative"
            alignItems="center"
            px={pxValue}
            bgGradient="linear(to-br, teal.400 0%, blue.700 100%)"
        >
            {/* 배경 이미지 */}
            <Image
                src={InviteBackground}
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
                    fontSize="3xl"
                    fontWeight="extrabold"
                    color="whiteAlpha.900"
                    letterSpacing="wider"
                >
                    일정에 초대받으셨습니다!
                </Heading>
                <Text fontSize="xl" fontWeight="semibold" color="whiteAlpha.900">
                    친구들과 함께 미지의 여행을 떠나보시겠어요?
                </Text>
                <Button
                    background="transparent"
                    border="1px solid white"

                    outline="none"
                    _hover={{
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "whiteAlpha.700",
                    }}
                    _focus={{
                        outline: "none",
                    }}

                    transition="all 0.2s ease-in-out"

                    onClick={joinTrip}
                >
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="whiteAlpha.900"
                    >
                        초대 수락하기
                    </Text>
                </Button>
            </VStack>
        </Flex>
    );
}