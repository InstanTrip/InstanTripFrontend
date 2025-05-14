import React, { useState } from 'react';
import Modal from 'react-modal';
import { Box, Flex, Text, Image, Input, useBreakpointValue } from "@chakra-ui/react";

import EarthImg from "@/assets/earth.svg";
import Close from "@/assets/close.svg";
import Loop from "@/assets/icon_loop.svg";
import TestImg from "@/assets/testimage.jpg";

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

    const closeModal = () => {
        setLocChangeModalIsOpen(false);
        setAccessModalIsOpen(false);
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
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: '576px',
                            height: '723px',
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
                            fontSize="30px"
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
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: '689px',
                            height: '628px',
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
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                >
                    <Text
                        fontSize="20px"
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
                h="100%"
                    bg={NicknameToHexColor("안재범")["color"]}
                >

                </Flex>
            </Modal>

            <Flex
                w="50vw"
                h="100vh"
                
                flexDirection="column"
                float="left"
                zIndex={1}
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"

                    px="50px"
                    pt="30px"
                >
                    <Text
                        fontSize="30px"
                        color="#585858"
                    >
                        InstanTrip.
                    </Text>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        gap="5px"

                        w="100px"
                        h="50px"

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
                        <Image src={EarthImg} alt="earth" />
                        <Text>공유</Text>
                    </Flex>
                </Flex>

                <Flex
                    mt="40px"
                    justifyContent="center"

                    gap="5px"
                >
                    <Text
                        fontSize="32px"
                        color="#585858"

                        onClick={dayDown}
                        cursor="pointer"
                    >
                        ⏴
                    </Text>
                    <Text
                        fontSize="32px"
                        color="#585858"
                    >
                        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                    </Text>
                    <Text
                        fontSize="32px"
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
                            w="70%"
                            py="20px"
                        >
                            {/* 세로선 */}
                            <Flex
                                w="60px"
                                borderRight="1px solid #606060"
                            />
                            <Flex
                                mt="5px"
                                ml="10px"
                                mr="10px"
                                flexDirection="column"
                                w="100%"
                            >
                                <Text>
                                    1번째
                                </Text>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"

                                    pl="50px"
                                    mt="5px"

                                    w="100%"
                                >
                                    <Flex>
                                        <Box
                                            w="75px"
                                            h="75px"
                                            borderRadius="15px"
                                            overflow="hidden"
                                        >
                                            <Image w="75px" h="75px" src={TestImg} />
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
            </Flex>

            <Flex h="100vh" w="50vw" float="left">
                <MapBox locationData={locationData} />
            </Flex>
        </Box>
    );
}