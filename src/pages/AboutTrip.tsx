import Modal from 'react-modal';
import { debounce } from 'lodash';
import { GridLoader } from 'react-spinners';
import useWebSocket from 'react-use-websocket';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Image, Input, Link, Alert, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"

import MapBox from "@/components/Map/MapBox";

import { getUserData } from '@/utils/Api';
import { FormatDate } from '@/utils/FormatDate';
import { getLocationData, searchLocation } from "@/utils/Api";
import { NicknameToHexColor } from "@/utils/NicknameToHexColor";

import Call from "@/assets/call.svg";
import Close from "@/assets/close.svg";
import CloseDarkmode from "@/assets/close_for_darkmode.svg";
import Loop from "@/assets/icon_loop.svg";
import LoopDarkmode from "@/assets/icon_loop_for_darkmode.svg";
import EarthImg from "@/assets/earth.svg";
import TriangleArrow from "@/assets/triangle_arrow.svg";
import InstanTripOriginLogo from "@/assets/instantrip_origin.webp";
import BlueRibbon from "@/assets/blueribbon.webp";


interface Node {
    destination_type: string;
    destination_id: string;
    memo: string;
}

interface Nodes {
    location: string;
    date: string;
    nodes: Node[];
}

interface User {
    name: string;
    color: string;
    text_color: string;
}

interface SearchResult {
    index: string;
    id: string;
    title: string;
    image: string[] | null;
    address: string;
    postal_code: string;
    score: number;
}

export default function AboutTrip() {
    const navigate = useNavigate();

    const isLightMode = useColorModeValue(true, false);
    const textColor = useColorModeValue("#696969", "#dddddd");
    const backgroundColor = useColorModeValue("#F4F4F4", "#242424");

    // 웹소켓으로 받아온 데이터
    const [ locationNodes, setLocationNodes ] = useState<Nodes[]>([]);

    // 페이지에 표시할 장소 데이터
    const [ locationNodesForPage, setLocationNodesForPage ] = useState<any[][]>([]);

    // [위도, 경도] 형식의 배열로 저장
    const [ locationData, setLocationData ] = useState<number[][]>([
        [36.1460625, 128.3934375],
    ]);

    // URL에서 id 파라미터 가져오기
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id');
    
    // 장소 변경 모달창 관련 변수
    const [ locChangeModalIsOpen, setLocChangeModalIsOpen ] = useState(false);
    const [ locChangeModalSearch, setLocChangeModalSearch ] = useState("");
    // 선택된 장소의 인덱스
    const [ selectIndex, setSelectIndex ] = useState<number>(0);
    // 검색결과
    const [ locChangeModalSearchResult, setLocChangeModalSearchResult ] = useState<SearchResult[]>([]);
    
    // 일정 공유 모달창 관련 변수
    const [ accessModalIsOpen, setAccessModalIsOpen ] = useState(false);

    // 장소 상세 모달창 관련 변수
    const [ locDetailModalIsOpen, setLocDetailModalIsOpen ] = useState(false);

    // 엑세스 권한이 있는 사용자 목록
    const [ accessUserList, setAccessUserList ] = useState<User[]>([]);

    const time_list = [
        "9:00",
        "10:00",
        "13:00",
        "14:00",
        "18:00",
        "19:00",
        "21:00",
    ]
    

    // 로그인 체크
    const { data: results, error: loginError } = useQuery({
        queryKey: ["isLogin"],
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
        if (loginError) {
            // Check if loginError has a 'status' property
            if (typeof (loginError as any).status === 'number' && (loginError as any).status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/', { replace: true });
            }
        }
    }, [results, loginError, navigate]);






    // 날짜 관련
    const [ date, setDate ] = useState<Date>(() => {
        const d = new Date();
        d.setHours(9, 0, 0, 0);
        return d;
    });

    const dayUp = () => {
        // 날짜를 하루 올림
        // maxDate보다 크면 안됨
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        if (newDate <= maxDate) {
            setDate(newDate);
        }
    }
    const dayDown = () => {
        // 날짜를 하루 내림
        // minDate보다 작으면 안됨
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        if (newDate >= minDate) {
            setDate(newDate);
        }
    }
    const [ minDate, setMinDate ] = useState<Date>(new Date());
    const [ maxDate, setMaxDate ] = useState<Date>(new Date());
    const [ dateIndex, setDateIndex ] = useState<number>(0);
    useEffect(() => {
        // 날짜가 바뀔 때마다 index 바꿈
        const newDate = new Date(date);
        let newDateIndex = locationNodes.findIndex((node) => node.date === newDate.toISOString().split("T")[0]);
        if (newDateIndex === -1) {
            newDateIndex = 0; // 해당 날짜가 없으면 0으로 설정
        }
        console.log(newDateIndex);
        setDateIndex(newDateIndex);
    }, [date]);

    // 공유 URL 코드
    const [ inviteCode, setInviteCode ] = useState<string>("");
    // 클립보드에 링크 복사 Alert 창 띄움
    const [showAlert, setShowAlert] = useState(false);
    const handleCopyClipBoard = async (text: string) => {
	    try {
	    	await navigator.clipboard.writeText(text);
	    	setShowAlert(true);
        
            // 3초 후 자동으로 숨김
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
	    } catch (err) {
	    	console.log(err);
	    }
    }

    // 모달창 띄워서 새 장소 받음, 모달창 띄우는 코드
    const changeLocation = (index: number) => {
        setLocChangeModalSearch("");
        setSelectIndex(index);
        
        setLocChangeModalIsOpen(true);
    }

    // 모든 모달창 닫는 함수
    // 모달창 닫는 함수는 모두 이 함수를 사용하게 함 - 충돌 방지
    const closeModal = () => {
        setLocChangeModalIsOpen(false);
        setAccessModalIsOpen(false);
        setLocDetailModalIsOpen(false);
        setLocChangeModalSearchResult([]);
        setLocChangeModalSearch("");
    }

    // 검색
    const { data: searchResults , isLoading: searchIsLoading, error: searchTripError, refetch: refetchSearchCreateTrip } = useQuery({
        queryKey: ["searchLocation"],
        queryFn: () => searchLocation(
            locationNodesForPage[dateIndex][selectIndex].location.lat,
            locationNodesForPage[dateIndex][selectIndex].location.lon,
            locationNodes[dateIndex].location,
            locChangeModalSearch
        ),
        enabled: false,
        // refetchOnWindowFocus: false,
    });
    // 검색 결과가 있을 때마다 모달창에 표시
    useEffect(() => {
        if (searchResults) {
            setLocChangeModalSearchResult(searchResults);
        }
    }, [searchResults]);

    // 300ms 디바운스 적용
    const debouncedSearch = useRef(debounce(() => {
        refetchSearchCreateTrip();
    }, 300)).current;

    useEffect(() => {
        if (locChangeModalSearch.length >= 2) {
            debouncedSearch();
        } else {
            setLocChangeModalSearchResult([]);
        }
    }, [locChangeModalSearch, debouncedSearch]);







    // 장소 교체
    const changeLocationInModal = (destination_type: string, destination_id: string) => {
        closeModal();

        if (readyState === WebSocket.OPEN) {
            sendMessage(JSON.stringify({
                message_type: "UPDATE",
                date: FormatDate(date),
                index: selectIndex,
                destination_type: destination_type,
                destination_id: destination_id,
                memo: ""
            }));
        }
    }







    // 장소 상세 모달창 띄우기
    const openLocDetailModal = (index: number) => {
        setSelectIndex(index);
        setLocDetailModalIsOpen(true);
    }


    const [isFirstConnect, setIsFirstConnect] = useState(true);

    // 웹소켓 연결
    const socketUrl = `wss://instantrip.ajb.kr/ws/trip?tripId=${id}`;
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log('WebSocket connection opened'),
        onClose: () => console.log('WebSocket connection closed'),
        onError: (event) => console.error('WebSocket error:', event),
        shouldReconnect: (closeEvent) => true,
    });

    // 첫 연결에 오류가 발생했을 경우 에러페이지로 이동
    useEffect(() => {
        if (readyState === WebSocket.CLOSED && isFirstConnect) {
            console.error("웹소켓 연결 실패, 에러페이지로 이동");
            navigate("/error?code=403", { replace: true });
        }
    }, [readyState, navigate]);

    useEffect(() => {
        // 웹소켓 연결이 성공적으로 이루어졌을 때 메시지 전송
        if (readyState === WebSocket.OPEN) {
            sendMessage(JSON.stringify({ message_type: "JOIN" }));
            if (isFirstConnect) {
                setIsFirstConnect(false);
            }
        }
    }, [readyState]);

    const [lastPongTime, setLastPongTime] = useState<number>(Date.now());

    // 웹소켓에서 받은 메시지 처리
    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data);
            if (data.type === "JOIN" || data.type === "UPDATE") {
                const plan = data.plan;

                console.log("웹소켓 메시지 수신:", plan);

                // 장소 데이터 업데이트
                setLocationNodes(plan.destinations);
                // 엑세스 권한이 있는 사용자 목록 업데이트
                setAccessUserList(plan.participants.map((user: string) => ({
                    name: user,
                    color: NicknameToHexColor(user)["color"],
                    text_color: NicknameToHexColor(user).textColor,
                })));
                // 날짜 범위 설정
                setMinDate(new Date(plan.plan_start));
                // 만약 date가 범위를 벗어나면 minDate로 설정
                if (date.getTime() < new Date(plan.plan_start).getTime() || date.getTime() > new Date(plan.plan_end).getTime()) {
                    setDate(new Date(plan.plan_start));
                }
                setMaxDate(new Date(plan.plan_end));

                // 공유 URL 코드 설정
                setInviteCode(plan.invite_code);
            } else if (data.type === "PONG") {
                if (lastPongTime !== data.time) {
                    setLastPongTime(data.time);
                    console.log("PONG: ", data.time);
                }
            }
        }
    }, [lastMessage]);
    useEffect(() => {
        if (readyState === WebSocket.OPEN) {
            const interval = setInterval(() => {
                console.log("PING")
                sendMessage(JSON.stringify({ message_type: "PING" }));
            }, 10000);

          return () => clearInterval(interval);
        }
    }, [readyState, sendMessage]);

    // 장소 데이터가 변경될 때마다 페이지에 표시할 장소 데이터 업데이트
    useEffect(() => {
        const fetchLocations = async () => {
            if (locationNodes.length === 0) return;

            // 요청할 데이터 배열 생성
            const tempLocDataList = locationNodes.map(n =>
                n.nodes.map(node => ({
                    type: node.destination_type,
                    id: node.destination_id
                }))
            );

            try {
                // 병렬로 모든 요청을 보냄
                const responses = await Promise.all(
                    tempLocDataList.map(tempLocData => getLocationData(tempLocData))
                );
                // 응답 데이터만 추출
                const resTempLocData = responses.map(res => res.data);

                setLocationNodesForPage(resTempLocData);
                console.log("장소 데이터 요청 성공:", resTempLocData);
            } catch (error) {
                console.error("장소 데이터 요청 실패:", error);
            }
        };

        fetchLocations();
    }, [locationNodes]);

    useEffect(() => {
        if (locationNodesForPage.length > 0) {
            const lat_lng: number[][] = [];
            // 전날 데이터가 존재한다면 전날 마지막 데이터 좌표 추가
            if (dateIndex > 0 && locationNodesForPage[dateIndex - 1]) {
                const lastNode = locationNodesForPage[dateIndex - 1][locationNodesForPage[dateIndex - 1].length - 1];
                lat_lng.push([lastNode.location.lat, lastNode.location.lon]);
            }
            console.log("aaa", dateIndex)
            for (let node of locationNodesForPage[dateIndex]) {
                lat_lng.push([node.location.lat, node.location.lon]);
            }

            setLocationData(lat_lng);

        }
    }, [locationNodesForPage, dateIndex]);






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

    // 모바일에서 사이드바가 안열린 상태로 데스크탑 환경으로 변경됐을 때 사이드바 강제 오픈
    useEffect(() => {
        if (!isMobile) {
            setLeftSlideLeft("0px");
            setSlideStatus(0);
        }
    }, [isMobile]);

    return (
        <Box
            w="100vw"
            h="100vh"

            position="relative"
        >
            {/* 로딩 스피너 */}
            <Flex
                position="fixed"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                backgroundColor="rgba(0, 0, 0, 0.7)"
                zIndex={9999}
                display={readyState != WebSocket.OPEN ? "flex" : "none"}
                justifyContent="center"
                alignItems="center"
            >
                <GridLoader
                    color="white"
                />
            </Flex>

            {/* 장소 데이터 알려줌 */}
            <Modal
                isOpen={locDetailModalIsOpen}
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
                            background: backgroundColor,
                            border: "none",
                            borderRadius: "25px",
                            transform: 'translate(-50%, -50%)',
                            padding: "40px",
                        }
                    }
                }
                contentLabel=""
            >
                <Flex
                    direction="column"
                    h="100%"
                    w="100%"
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                    >
                        <Text
                            fontSize={changeLocModalTitle}
                            color={textColor}
                        >
                            {
                                locationNodesForPage && locationNodesForPage[dateIndex] && locationNodesForPage[dateIndex][selectIndex].title &&
                                    locationNodesForPage[dateIndex][selectIndex].title
                            }
                        </Text>
                        <Image
                            src={isLightMode ? Close : CloseDarkmode}
                            alt="close"
                            onClick={closeModal}
                            cursor="pointer"
                        />
                    </Flex>

                    <Flex
                        mt="25px"
                    >
                        <Box
                            w="100%"
                            h="300px"
                            flexShrink={0}
                            mx="5px"
                            borderRadius="15px"
                            overflow="hidden"
                            css={{
                                scrollSnapAlign: 'start',
                            }}
                        >
                            <Image
                                w="100%"
                                h="100%"
                                src={
                                    locationNodesForPage && locationNodesForPage.length > 0 &&
                                        locationNodesForPage[dateIndex] &&
                                        locationNodesForPage[dateIndex][selectIndex] &&
                                        locationNodesForPage[dateIndex][selectIndex].image &&
                                        locationNodesForPage[dateIndex][selectIndex].image.length > 0 ?
                                        locationNodesForPage[dateIndex][selectIndex].image[0] : InstanTripOriginLogo
                                }
                                loading="lazy"
                            />
                        </Box>

                    </Flex>
                    <Flex
                        w="100%"
                        h="calc(100% - 385px)"

                        direction="column"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"

                            w="100%"
                            pr="10px"
                            py="5px"
                        >
                            <Text
                                color="#848484"
                            >
                                {
                                    locationNodesForPage &&
                                        locationNodesForPage.length > 0 &&
                                        locationNodesForPage[dateIndex] &&
                                        locationNodesForPage[dateIndex].length > 0 &&
                                            locationNodesForPage[dateIndex][selectIndex].address
                                }
                            </Text>
                                
                            {/* 전화 */}
                            <Flex>
                                {
                                    locationNodesForPage &&
                                        locationNodesForPage.length > 0 &&
                                        locationNodesForPage[dateIndex] &&
                                        locationNodesForPage[dateIndex][selectIndex].tel &&
                                        locationNodesForPage[dateIndex][selectIndex].tel !== "" ?
                                    (
                                        <Flex
                                            w="45px"
                                            h="45px"

                                            rounded="10px"

                                            justifyContent="center"
                                            alignItems="center"
                                            
                                            bg="#66CC54"

                                            _hover={{
                                                backgroundColor: "#148300",
                                            }}

                                            color="white"
                                            onClick={() => {
                                                window.open(`tel:${locationNodesForPage[dateIndex][selectIndex].tel}`);
                                            }}
                                            cursor={locationNodesForPage.length > 0 && locationNodesForPage[dateIndex].length > 0 && locationNodesForPage[dateIndex][selectIndex].tel ? "pointer" : "not-allowed"}

                                            transition="0.3s all ease-in-out"
                                        >
                                            <Image
                                                src={Call}
                                                alt="call"
                                                w="23px"
                                                h="23px"
                                            />
                                        </Flex>
                                        )
                                        : null
                                        
                                    }
                            </Flex>
                        </Flex>

                        {
                            locationNodesForPage &&
                            locationNodesForPage.length > 0 &&
                            locationNodesForPage[dateIndex] &&
                            locationNodesForPage[dateIndex][selectIndex].ribbon_count &&
                                locationNodesForPage[dateIndex][selectIndex].ribbon_count > 0 ? (
                                    <Flex alignItems="center" gap="5px">
                                        {Array.from(
                                            { length: locationNodesForPage[dateIndex][selectIndex].ribbon_count }
                                        ).map((_, idx) => (
                                            <Image
                                            key={idx}
                                            src={BlueRibbon}
                                            alt="blue ribbon"
                                            h="20px"
                                            />
                                        ))}
                                    </Flex>
                            ) : null
                        }

                        <Flex
                            overflowY="auto"
                            h="100%"
                        >
                            <Text
                                whiteSpace="pre-wrap"
                            >
                                {
                                    locationNodesForPage &&
                                        locationNodesForPage.length > 0 &&
                                        locationNodesForPage[dateIndex] &&
                                        locationNodesForPage[dateIndex].length > 0 &&
                                        locationNodesForPage[dateIndex][selectIndex] &&
                                        locationNodesForPage[dateIndex][selectIndex].description &&
                                            locationNodesForPage[dateIndex][selectIndex].description
                                                .replaceAll("<br />", "\n")
                                                .replace("<br>" , "\n")
                                                .replaceAll("<br/>", "\n")
                                                .replaceAll("&lt;", "<")
                                                .replaceAll("&gt;", ">")
                                                .replaceAll("&amp;", "&")
                                                .replaceAll("&nbsp;", " ")
                                                .replaceAll("&quot;", "\"")
                                                .replaceAll("&apos;", "'")
                                }
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>

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
                            background: backgroundColor,
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
                            color={textColor}
                        >
                            교체할 장소를 선택하세요
                        </Text>
                        <Image
                            src={isLightMode ? Close : CloseDarkmode}
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
                        h="calc(100% - 100px)"

                        mt="20px"
                    >
                        <Box
                            bg={isLightMode ? '#EEEEEE' : '#2d2d2d'}
                            w="100%"
                            h="100%"

                            rounded="15px"

                            overflowY="auto"
                        >
                            {
                                locChangeModalSearchResult && locChangeModalSearchResult.length > 0 ? (
                                    locChangeModalSearchResult.map((location, index) => (
                                        <Flex
                                            alignItems="center"

                                            p="20px"

                                            justifyContent="space-between"

                                            key={index}
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
                                                        src={!location.image || location.image.length === 0 ? InstanTripOriginLogo.replace("http://", "https://") : location.image[0]}
                                                        loading="lazy"
                                                    />
                                                </Box>

                                                <Flex
                                                    pl="15px"
                                                    gap="5px"

                                                    flexDirection="column"
                                                >
                                                    <Text fontSize="17px" color={textColor}>
                                                        {location.title}
                                                    </Text>
                                                    <Text fontSize="12px" color="#B3B3B3">
                                                        {location.address}
                                                    </Text>
                                                </Flex>
                                            </Flex>

                                            <Flex
                                                cursor="pointer"
                                                onClick={() => {changeLocationInModal(location.index, location.id)}}
                                                    
                                            >
                                                <Image
                                                    src={isLightMode ? Loop : LoopDarkmode}
                                                    alt="loop"
                                                />
                                            </Flex>
                                        </Flex>
                                    ))
                                ) : (
                                    <Flex
                                        justifyContent="center"
                                        alignItems="center"

                                        w="100%"
                                        h="100%"
                                    >
                                        <Text
                                            fontSize="20px"
                                            color="#747474"
                                        >
                                            검색 결과가 없습니다
                                        </Text>
                                    </Flex>
                                )
                            }
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
                            background: backgroundColor,
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
                            color={textColor}
                        >
                            엑세스 권한이 있는 사용자
                        </Text>

                        <Image
                            src={isLightMode ? Close : CloseDarkmode}
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
                                        color={textColor}
                                        fontWeight="bold"
                                    >
                                        {user.name}
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
                            color={textColor}
                        >
                            공유
                        </Text>
                        <Flex
                            ml={isMobile ? "10px" : "20px"}

                            border={isLightMode ? "1px solid #DEDEDE" : "1px solid #3b3b3b"}

                            alignItems="center"
                            px="9px"

                            onClick={() => handleCopyClipBoard(`https://instantrip.ajb.kr/invite?code=${inviteCode}`)}
                            cursor="pointer"
                        >
                            <Text
                                fontSize="16px"
                                color={isLightMode ? "blue" : "blue.300"}
                            >
                                https://instantrip.ajb.kr/invite?code={inviteCode}
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

                zIndex={1}

                left={leftSlideLeft}

                backgroundColor={backgroundColor}

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
                        color={textColor}

                        outline="none"
                        textDecoration="none"
                        href="/"

                        _hover={{
                            textDecoration: "none",
                            color: textColor,
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
                        bg={isLightMode ? "#93E2FF" : "#4682B4"}

                        borderRadius="25px"

                        cursor="pointer"
                        transition="0.3s all ease-in-out"

                        _hover={{
                            backgroundColor: isLightMode ? "#7CC4E5" : "#3b709b",
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
                        color={textColor}

                        onClick={dayDown}

                        opacity={FormatDate(date) === FormatDate(minDate) ? 0.5 : 1}
                        cursor={FormatDate(date) === FormatDate(minDate) ? "not-allowed" : "pointer"}
                    >
                        ⏴
                    </Text>
                    <Text
                        color={textColor}
                    >
                        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                    </Text>
                    <Text
                        color={textColor}

                        onClick={dayUp}

                        opacity={FormatDate(date) === FormatDate(maxDate) ? 0.5 : 1}
                        cursor={FormatDate(date) === FormatDate(maxDate) ? "not-allowed" : "pointer"}
                    >
                        ⏵
                    </Text>
                </Flex>

                <Flex
                    mt="50px"
                    justifyContent="center"

                    h={isMobile ? "calc(100% - 250px)" : "calc(100% - 300px)"}

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

                            {/* 장소 데이터 출력 */}
                            <Flex
                                ml="10px"
                                direction="column"
                                w="100%"
                                overflowY="auto"
                            >
                                {
                                    locationNodesForPage &&
                                        locationNodesForPage.length > 0 &&
                                        locationNodesForPage[dateIndex] &&
                                        locationNodesForPage[dateIndex].map((location, index) => (
                                        <Flex
                                            w="100%"
                                            mt="5px"
                                            direction="column"
                                            key={index}
                                        >
                                            <Text
                                                fontSize={isMobile ? "17px" : "20px"}
                                            >
                                                {index + 1}. {time_list[index]}
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

                                                    onClick={() => openLocDetailModal(index)}
                                                    cursor="pointer"
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
                                                            src={
                                                                !location.image || location.image.length === 0 ? InstanTripOriginLogo.replace("http://", "https://") : location.image[0]
                                                            }
                                                            loading="lazy"
                                                        />
                                                    </Box>
                                                    <Box
                                                        pl="15px"
                                                        pt="5px"
                                                    >
                                                        <Flex
                                                            alignItems="center"
                                                            h="100%"

                                                            gap="3px"
                                                        >
                                                            <Text fontSize="17px" color={textColor}>
                                                                {location.title}

                                                            </Text>
                                                            {
                                                                location.ribbon_count > 0 ? (
                                                                    <Flex
                                                                        alignItems="center"
                                                                        h="100%"
                                                                        gap="5px"
                                                                    >
                                                                        {Array.from({ length: location.ribbon_count }).map((_, idx) => (
                                                                            <Image
                                                                                key={idx}
                                                                                src={BlueRibbon}
                                                                                alt="blue ribbon"
                                                                                h="20px"
                                                                            />
                                                                        ))}
                                                                    </Flex>
                                                                ) : null
                                                            }
                                                        </Flex>
                                                        <Text fontSize="12px" color="#B0B0B0">
                                                            {location.address}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                                <Flex
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    border={isLightMode ? "1px solid #E9E9E9" : "1px solid #2d2d2d"}
                                                    borderRadius="15px"
                                                    w="80px"
                                                    h="35px"
                                                    cursor="pointer"
                                                    transition="0.3s all ease-in-out"
                                                    _hover={{
                                                        backgroundColor: isLightMode ? "#E9E9E9" : "#2d2d2d",
                                                    }}
                                                
                                                    onClick={() => changeLocation(index)}
                                                >
                                                    <Text
                                                        color={textColor}
                                                    >
                                                        교체
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    ))
                                }
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
                <MapBox
                    locationData={locationData}
                    dateIndex={dateIndex}
                    openLocDetailModal={openLocDetailModal}
                />
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

                bg={isLightMode ? "#93E2FF" : "#4682B4"}
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

            
            <Box
                position="fixed"
                top={showAlert ? "20px" : "-100px"}
                // 중앙
                left="50%"
                transform="translateX(-50%)"

                zIndex="toast"
                maxWidth="400px"
                transition="all 0.2s ease-in-out"
            >
                <Alert.Root status="success">
                    <Alert.Indicator />
                    <Alert.Title>클립보드에 복사되었습니다</Alert.Title>
                </Alert.Root>
            </Box>
        </Box>
    );
}