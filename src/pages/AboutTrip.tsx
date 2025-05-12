import React, { useState } from 'react';
import Modal from 'react-modal';
import { Box, Flex, Text, Image } from "@chakra-ui/react";

import EarthImg from "@/assets/earth.svg";
import TestImg from "@/assets/testimage.jpg";

import MapBox from "@/components/Map/MapBox";

export default function AboutTrip() {
    const [ locationData, setLocationData ] = useState<number[][]>([
        [36.1460625, 128.3934375],
        [36.140882020156, 128.419129591913],
        [36.1284582, 128.3307228]
    ]);

    const [ date, setDate ] = useState<Date>(new Date("2025-10-01"));

    const [ locChangeModalIsOpen, setLocChangeModalIsOpen ] = useState(false);

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

        
    }

    return (
        <Box
            w="100vw"
            h="100vh"

            position="relative"
        >
            <Modal
                isOpen={locChangeModalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Text>모달창 테스트</Text>
            </Modal>
            <Box h="100vh" w="50vw" float="left" zIndex={1}>
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

                    h="450px"

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

            <Box h="100vh" w="50vw" float="left">
                <MapBox locationData={locationData} />
            </Box>
        </Box>
    );
}