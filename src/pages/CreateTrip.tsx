import { useState, useEffect } from 'react';
import { Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { GridLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import { fetchCreateTrip } from '@/utils/Api';
import { FormatDate } from '@/utils/FormatDate';

import StatusBar from '@/components/CreateTrip/StatusBar';
// import TripPeriod from '@/components/TripSetting/TripPeriod';
import Calender from '@/components/CreateTrip/Calender';
import Area from '@/components/CreateTrip/Area';
import Taste from '@/components/CreateTrip/Taste';

export default function CreateTrip() {
    // 이 페이지는 여행 일정 만들기 초기 설정 페이지임
    // 여행 기간, 떠나고 싶은 지역, 취향 선택 받아야함
    // 여행 기간은 달력으로 선택
    // 떠나고 싶은 지역 선택 최대값은 여행 기간 날짜 만큼

    const [page, setPage] = useState(1); // 페이지 번호(1, 2, 3)
    // const [selectedArea, setSelectedArea] = useState<string | null>(null);

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (page === 1) {
            // 여행 기간 선택 페이지에서 다음 버튼 클릭 시
            if (!startDate || !endDate) {
                alert("여행 기간을 선택해주세요.");
                return;
            }
        }
        if (page === 2) {
            // 떠나고 싶은 지역 페이지에서 다음 버튼 클릭 시
            if (selectedAreas.length === 0) {
                alert("떠나고 싶은 지역을 1개 지역 이상 선택해주세요.");
                return;
            }
        }
        if (page < 3) setPage(page + 1);
    };

    const navigate = useNavigate();

    // 여행 기간 선택
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [tripPeriod, setTripPeriod] = useState<number>(0);

    // 지역 선택
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    // 취향 선택
    const [destinationTaste, setDestinationTaste] = useState<string[]>([]);
    const [foodTaste, setFoodTaste] = useState<string[]>([]);
    const [accommodationTaste, setAccommodationTaste] = useState<string[]>([]);

    // 여행 기간 계산
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setTripPeriod(diffDays);
        }
    }, [startDate, endDate]);

    const { data: results , isLoading: isLoading, error: tripError, refetch: refetchCreateTrip } = useQuery({
        queryKey: [],
        queryFn: () => fetchCreateTrip({
            start_date: FormatDate(startDate),
            end_date: FormatDate(endDate),
            location: selectedAreas,
            accommodation_taste: accommodationTaste,
            destination_taste: destinationTaste,
            restaurant_taste: foodTaste,
        }),
        enabled: false,
    });

    const createTrip = () => {
        refetchCreateTrip();
    };

    // 여행 일정이 생성되었을 경우
    useEffect(() => {
        if (tripError) {
            alert("여행 일정 생성을 하려면 로그인이 필요합니다.");
            navigate("/oauth2/authorization/cognito?prompt=login")
            return;
        }
        if (results) {
            console.log("여행 일정 생성 결과", results);

            navigate(`/aboutrip?id=${results.data.plan_id}`);
        }
    }, [results, tripError]);

    const gap = useBreakpointValue({ base: "15px", md: "70px" });

    return (
        <Flex
            w="100vw"
            h="100vh"
            backgroundColor="#F4F4F4"
            direction="column"
            alignItems="center"
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
                display={isLoading ? "flex" : "none"}
                justifyContent="center"
                alignItems="center"
            >
                <GridLoader
                    color="white"
                />
            </Flex>

            {/* 1, 2, 3 띄워주는놈 */}
            <Flex
                w="100%"
                h="100px"
                alignItems="center"
                mt="30px"

                direction="column"
            >
                <StatusBar count={page} setPage={setPage} />
                {
                    page === 1 ? (
                        <Text color="#575757" mt="30px" fontSize="20px">
                            여행 기간 선택
                        </Text>
                    ) : page === 2 ? (
                        <Text color="#575757" mt="30px" fontSize="20px">
                            떠나고 싶은 지역
                        </Text>
                    ) : (
                        <Text color="#575757" mt="30px" fontSize="20px">
                            취향 선택
                        </Text>
                    )
                }
            </Flex>

            <Flex
                my={gap}
                h="100%"
                // alignItems="center"
                overflowY="auto"
                px="10px"
            >
                {/* 여행 기간 선택 */}
                {page === 1 && (
                    <Flex
                        alignItems="center"
                    >
                        <Calender
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                    </Flex>
                )}
                
                {page === 2 && (
                    <Area
                        tripPeriod={tripPeriod}
                        selectedAreas={selectedAreas}
                        setSelectedAreas={setSelectedAreas}
                    />
                )}

                {page === 3 && (
                    <Taste
                        destinationTaste={destinationTaste}
                        setDestinationTaste={setDestinationTaste}
                        foodTaste={foodTaste}
                        setFoodTaste={setFoodTaste}
                        accommodationTaste={accommodationTaste}
                        setAccommodationTaste={setAccommodationTaste}
                    />
                )}
            </Flex>

            {/* 다음 버튼 */}
            {page < 3 && (
                <Button
                    fontSize="20px"
                    backgroundColor="#F4F4F4"
                    color="#575757"
                    onClick={handleNextPage}
                    mb="30px"
                    outline="none"
                    border="none"

                    _focus={{
                        border: "none",
                        outline: "none",
                    }}
                >
                    다음 ⏵
                </Button>
            )}

            {/* 마지막 페이지일 경우 일정 생성 버튼 */}
            {page === 3 && (
                <Button
                    fontSize="20px"
                    backgroundColor="#F4F4F4"
                    color="#575757"
                    onClick={() => {createTrip()}}
                    mb="30px"
                    outline="none"
                    border="none"

                    _focus={{
                        border: "none",
                        outline: "none",
                    }}
                >
                    여행 일정 생성하기 ⏵
                </Button>
            )}
        </Flex>
    );
}
