import { useState } from 'react';
import Modal from 'react-modal';
import { Box, Flex, Text, Image, Input, Link, useBreakpointValue } from "@chakra-ui/react";

import EarthImg from "@/assets/earth.svg";
import Close from "@/assets/close.svg";
import Loop from "@/assets/icon_loop.svg";
import TestImg from "@/assets/testimage.jpg";
import TriangleArrow from "@/assets/triangle_arrow.svg";

import MapBox from "@/components/Map/MapBox";

import { NicknameToHexColor } from "@/utils/NicknameToHexColor";

export default function AboutTrip() {
    // 지도에 표시할 장소 데이터
    // [위도, 경도] 형식의 배열로 저장
    const [ locationData, setLocationData ] = useState<number[][]>([
        [36.1460625, 128.3934375],
        [36.140882020156, 128.419129591913],
        [36.1284582, 128.3307228]
    ]);

    
    // 장소 변경 모달창 관련 변수
    const [ locChangeModalIsOpen, setLocChangeModalIsOpen ] = useState(false);
    const [ locChangeModalSearch, setLocChangeModalSearch ] = useState("");
    
    // 일정 공유 모달창 관련 변수
    const [ accessModalIsOpen, setAccessModalIsOpen ] = useState(false);

    const [ accessUserList, setAccessUserList ] = useState([
        {
            name: "안재범",
            email: "ajb@instantrip.ajb.kr",
            color: NicknameToHexColor("안재범")["color"],
            text_color: NicknameToHexColor("안재범").textColor,
        },
        {
            name: "김태완",
            email: "ktw@instantrip.ajb.kr",
            color: NicknameToHexColor("김태완").color,
            text_color: NicknameToHexColor("김태완").textColor,
        },
        {
            name: "이동희",
            email: "lee@instantrip.ajb.kr",
            color: NicknameToHexColor("이동희").color,
            text_color: NicknameToHexColor("이동희").textColor,
        },
        {
            name: "박수현",
            email: "qtg@instantrip.ajb.kr",
            color: NicknameToHexColor("박수현").color,
            text_color: NicknameToHexColor("박수현").textColor,
        },
        {
            name: "노현우",
            email: "qtg@instantrip.ajb.kr",
            color: NicknameToHexColor("노현우").color,
            text_color: NicknameToHexColor("노현우").textColor,
        }
    ]);
    
    // 날짜 관련 변수
    const [ date, setDate ] = useState<Date>(new Date("2025-10-01"));
    const dayUp = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        setDate(newDate);
    }
    const dayDown = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        setDate(newDate);
    }

    const changeLocation = (index: number) => {
        // 모달창 띄워서 새 장소 받음, 모달창 띄우는 코드

        setLocChangeModalIsOpen(true);
        setLocChangeModalSearch("");
    }

    // 모든 모달창 닫는 함수
    // 모달창 닫는 함수는 모두 이 함수를 사용하게 함 - 충돌 방지
    const closeModal = () => {
        setLocChangeModalIsOpen(false);
        setAccessModalIsOpen(false);
    }




    // 반응형
    // 로고 반응형
    const logoFontSize: string = useBreakpointValue({ base: "25px", md: "30px" }) as string;

    const isMobile: boolean = useBreakpointValue({ base: true, md: false }) as boolean;
    const leftSlideWidth: string = useBreakpointValue({ base: "100vw", md: "50vw" }) as string;
    const mapWidth: string = useBreakpointValue({ base: "100vw", md: "50vw" }) as string;

    const changeLocModalWidth: string = useBreakpointValue({ base: "90vw", md: "576px" }) as string;
    const changeLocModalHeight: string = useBreakpointValue({ base: "95vh", md: "723px" }) as string;
    const changeLocModalTitle: string = useBreakpointValue({ base: "17px", md: "30px" }) as string;

    const shareModalWidth: string = useBreakpointValue({ base: "90vw", md: "689px" }) as string;
    const shareModalHeight: string = useBreakpointValue({ base: "95vh", md: "628px" }) as string;
    const shareModalTitle: string = useBreakpointValue({ base: "17px", md: "24px" }) as string;

    const [leftSlideLeft, setLeftSlideLeft] = useState("0px");


    // 0: 기본값
    // 1: 일정창이 지도를 가림
    const [ slideStatus, setSlideStatus ] = useState(0);


    const togleSlideStatus = () => {
        if (slideStatus === 0) {
            setLeftSlideLeft("-100vw");
            setSlideStatus(1);
        } else {
            setLeftSlideLeft("0vw");
            setSlideStatus(0);
        }
    }

    return (
        <Box
            w="100vw"
            h="100vh"

            position="relative"
        >
            {/* 장소 교체 모달창 */}
            <Modal
                isOpen={locChangeModalIsOpen}
                onRequestClose={closeModal}
                style={
                    {
                        overlay: {
                            backgroundColor: '#000000A0',
                            zIndex: 1000,
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: changeLocModalWidth,
                            height: changeLocModalHeight,
                            marginRight: '-50%',
                            background: "#F4F4F4",
                            border: "none",
                            borderRadius: "25px",
                            transform: 'translate(-50%, -50%)',
                            padding: "40px",
                        }
                    }
                }
                contentLabel="장소 교체"
            >
                <Flex
                    flexDirection="column"
                    h="100%"
                    w="100%"

                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            fontSize={changeLocModalTitle}
                            color="#5A5A5A"
                        >
                            교체할 장소를 선택하세요
                        </Text>
                        <Image
                            src={Close}
                            alt="close"
                            onClick={closeModal}
                            cursor="pointer"
                        />
                    </Flex>

                    <Input
                        mt="25px"
                        placeholder="장소를 검색하세요"
                        p="10px"
                        value={locChangeModalSearch}
                        onChange={(e) => setLocChangeModalSearch(e.target.value)}
                        border="0px"
                        borderBottom="1px solid #747474"
                        borderRadius="0px"
                        outline="none"
                        fontSize="20px"
                        _placeholder={
                            {
                                fontSize: "20px",
                                color: "#747474"
                            }
                        }
                    />

                    <Flex
                        justifyContent="center"
                        w="100%"
                        h="100%"

                        mt="20px"
                    >
                        <Box
                            bg='#EEEEEE'
                            w="100%"
                            h="100%"

                            rounded="15px"
                        >
                            <Flex
                                alignItems="center"

                                p="20px"

                                justifyContent="space-between"
                            >
                                <Flex
                                    alignItems="center"
                                >
                                    <Box
                                        w="75px"
                                        h="75px"
                                        borderRadius="15px"
                                        overflow="hidden"
                                    >
                                        <Image
                                            w="100%"
                                            h="100%"
                                            src={TestImg}
                                        />
                                    </Box>

                                    <Flex
                                        pl="15px"
                                        gap="5px"

                                        flexDirection="column"
                                    >
                                        <Text fontSize="17px" color="#727272">
                                            짜장꽃필무렵
                                        </Text>
                                        <Text fontSize="12px" color="#B3B3B3">
                                            경상북도 구미시 대학로 39
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex>
                                    <Image
                                        src={Loop}
                                        alt="loop"
                                    />
                                </Flex>
                            </Flex>
                        </Box>

                    </Flex>
                </Flex>
            </Modal>

            {/* 일정 공유 모달창 */}
            <Modal
                isOpen={accessModalIsOpen}
                onRequestClose={closeModal}
                style={
                    {
                        overlay: {
                            backgroundColor: '#000000A0',
                            zIndex: 1000,
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: shareModalWidth,
                            height: shareModalHeight,
                            marginRight: '-50%',
                            background: "#F4F4F4",
                            border: "none",
                            borderRadius: "25px",
                            transform: 'translate(-50%, -50%)',
                            padding: "40px",
                        }
                    }
                }
                contentLabel="일정 공유"
            >
                <Flex
                    flexDirection="column"
                    h="100%"
                    w="100%"
                >

                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                    >
                        <Text
                            fontSize={shareModalTitle}
                            color="#575757"
                        >
                            엑세스 권한이 있는 사용자
                        </Text>

                        <Image
                            src={Close}
                            alt="close"
                            onClick={closeModal}
                            cursor="pointer"
                        />
                    </Flex>

                    <Flex
                        w="100%"
                        h="397px"
                        mt="20px"
                        overflowY="auto"
                        flexDirection="column"
                        pl={isMobile ? "10px" : "20px"}
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'none',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#CBCBCB',
                                borderRadius: '4px',
                            },
                        }}

                        gap="10px"
                    >
                        {accessUserList.map((user, index) => (
                            <Flex
                                key={index}
                                w="100%"
                                alignItems="center"
                            >
                                <Flex
                                    w={isMobile ? "40px" : "50px"}
                                    h={isMobile ? "40px" : "50px"}
                                    borderRadius="50%"
                                    justifyContent="center"
                                    alignItems="center"
                                    bg={user.color}
                                    color={user.text_color}
                                    fontSize={isMobile ? "13px" : "18px"}
                                >
                                    {user.name.charAt(0)}
                                </Flex>
                                <Flex
                                    ml="15px"
                                    flexDirection="column"
                                >
                                    <Text
                                        fontSize={isMobile ? "14px" : "16px"}
                                        color="#575757"
                                        fontWeight="bold"
                                    >
                                        {user.name}
                                    </Text>
                                    <Text
                                        fontSize={isMobile ? "12px" : "14px"}
                                        color="#CBCBCB"
                                    >
                                        {user.email}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>

                    <Flex
                        direction="column"

                        gap="10px"
                    >
                        <Text
                            fontSize={shareModalTitle}
                            color="#575757"
                        >
                            공유
                        </Text>
                        <Flex
                            ml={isMobile ? "10px" : "20px"}

                            border="1px solid #DEDEDE"

                            alignItems="center"
                            px="9px"
                        >
                            <Text
                                fontSize="16px"
                            >
                                URL
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>

            <Box
                w={leftSlideWidth}
                h="100vh"
                
                position="absolute"
                
                flexDirection="column"
                float="left"

                bg="#F4F4F4"
                zIndex={1}

                left={leftSlideLeft}

                transition="0.3s all ease-in-out"
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"

                    px={isMobile ? "20px" : "50px"}
                    pt={isMobile ? "20px" : "30px"}
                >
                    <Link
                        fontSize={logoFontSize}
                        color="#585858"

                        outline="none"
                        textDecoration="none"
                        href="/"

                        _hover={{
                            textDecoration: "none",
                            color: "#585858",
                        }}
                    >
                        InstanTrip
                    </Link>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        gap="5px"

                        w={isMobile ? "65px" : "100px"}
                        h={isMobile ? "35px" : "50px"}

                        color="white"
                        bg="#93E2FF"

                        borderRadius="25px"

                        cursor="pointer"
                        transition="0.3s all ease-in-out"

                        _hover={{
                            backgroundColor: "#7CC4E5",
                        }}

                        onClick={() => setAccessModalIsOpen(true)}
                    >
                        <Image
                            src={EarthImg}
                            alt="earth"
                            w={isMobile ? "15px" : "20px"}
                        />
                        <Text
                            fontSize={isMobile ? "13px" : "18px"}
                        >공유</Text>
                    </Flex>
                </Flex>

                <Flex
                    mt="40px"
                    justifyContent="center"

                    fontSize={isMobile ? "25px" : "32px"}

                    gap="5px"
                >
                    <Text
                        color="#585858"

                        onClick={dayDown}
                        cursor="pointer"
                    >
                        ⏴
                    </Text>
                    <Text
                        color="#585858"
                    >
                        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                    </Text>
                    <Text
                        color="#585858"

                        onClick={dayUp}
                        cursor="pointer"
                    >
                        ⏵
                    </Text>
                </Flex>

                <Flex
                    mt="50px"
                    justifyContent="center"

                    h="calc(100% - 300px)"

                    gap="5px"
                >
                    <Flex
                        justifyContent="center"
                        w="100%"
                    >
                        <Flex
                            w={isMobile ? "90%" : "70%"}
                            py={isMobile ? "0px" : "20px"}
                        >
                            {/* 세로선 */}
                            <Flex
                                w={isMobile ? "10px" : "60px"}
                                borderRight="1px solid #606060"
                            />
                            <Flex
                                mt="5px"
                                ml="10px"
                                mr="10px"
                                flexDirection="column"
                                w="100%"
                            >
                                <Text
                                    fontSize={isMobile ? "17px" : "20px"}
                                >
                                    1번째
                                </Text>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"

                                    pl={isMobile ? "10px" : "20px"}
                                    mt="5px"

                                    w="100%"
                                >
                                    <Flex
                                        alignItems="center"
                                    >
                                        <Box
                                            w={isMobile ? "60px" : "75px"}
                                            h={isMobile ? "60px" : "75px"}
                                            borderRadius="15px"
                                            overflow="hidden"
                                        >
                                            <Image
                                                w={isMobile ? "60px" : "75px"}
                                                h={isMobile ? "60px" : "75px"}
                                                src={TestImg}
                                            />
                                        </Box>

                                        <Box
                                            pl="15px"
                                            pt="5px"
                                        >
                                            <Text fontSize="17px" color="#606060">
                                                짜장꽃필무렵
                                            </Text>
                                            <Text fontSize="12px" color="#B0B0B0">
                                                경상북도 구미시 대학로 39
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Flex
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid #E9E9E9"
                                        borderRadius="15px"

                                        w="80px"
                                        h="35px"

                                        cursor="pointer"

                                        transition="0.3s all ease-in-out"

                                        _hover={{
                                            backgroundColor: "#E9E9E9",
                                        }}

                                        onClick={() => changeLocation(1)}
                                    >
                                        <Text
                                            color="#696969"
                                        >
                                            교체
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            <Box
                h="100vh"
                w={mapWidth}
                float="left"
                
                position="absolute"
                right="0"
            >
                <MapBox locationData={locationData} />
            </Box>

            {/* 플로팅버튼 */}
            <Flex
                position="absolute"
                bottom="30px"
                right="30px"

                w="50px"
                h="50px"

                justifyContent="center"
                alignItems="center"

                bg="#93E2FF"
                borderRadius="50%"

                zIndex={2}

                cursor="pointer"
                transition="0.3s all ease-in-out"

                _hover={{
                    backgroundColor: "#7CC4E5",
                }}

                onClick={togleSlideStatus}

                // 모바일일 경우에만 나타남
                display={isMobile ? "flex" : "none"}

                transform={slideStatus === 0 ? "rotate(90deg)" : "rotate(-90deg)"}
            >
                <Image
                    mb="3px"
                    w="20px"
                    src={TriangleArrow}
                    alt="triangle"
                />
            </Flex>
        </Box>
    );
}