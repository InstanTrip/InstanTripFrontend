import React, { useState, useEffect, use } from "react"
import { Flex, Text, Table, Checkbox, Pagination, ButtonGroup, IconButton, NativeSelect, useBreakpointValue } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import NotFoundSchedule from "./NotFoundSchedule";

import { fetchTripList, rmTrip } from "@/utils/Api";

interface Taste {
    accommodation_taste: string[];
    destination_taste: string[];
    restaurant_taste: string[];
}

interface Trip {
    plan_id: string;
    location: string[];
    taste: Taste;
    plan_start: string;
    plan_end: string;
}

export default function Schedule() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const navigate = useNavigate();

    // 선택된 여행들 아이디 값
    const [selection, setSelection] = useState<string[]>([]);
    // 한번에 보여줄 여행 일정 개수
    const [tripListCount, setTripListCount] = useState<number>(15);
    // 현재 페이지
    const [nowPage, setNowPage] = useState<number>(1);

    // 여행 일정 목록을 보여줄 행들
    const [rows, setRows] = useState<React.ReactElement[]>([]);

    // 여행 일정 개수
    const tripListPageSizeList = [15, 30, 50];

    // 여행 일정 목록
    const [items, setItems] = useState<Trip[]>([]);

    const { data: results, isLoading: isLoading, error: tripError, refetch: refetchTripList } = useQuery({
        queryKey: [],
        queryFn: () => fetchTripList(),
        enabled: true,
    });

    const removeMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            // 선택된 모든 여행 일정에 대해 순차적으로 삭제 요청
            const promises = ids.map(id => rmTrip(id));
            return Promise.all(promises);
        },
        onSuccess: () => {
            alert("선택한 여행 일정이 삭제되었습니다.");
            setSelection([]); // 선택 초기화
            refetchTripList(); // 목록 새로고침
        },
        onError: () => {
            alert("여행 일정 삭제에 실패했습니다.");
        }
    });

    useEffect(() => {
        if (tripError) {
            alert("로그인이 필요합니다!");
            navigate("/");
        }
        if (results) {
            if (results.data.Error) {
                setItems([]);
                return;
            }
            setItems(results.data);
        }
    }, [results, tripError]);

    const rmSelectedTrip = () => {
        if (selection.length === 0) {
            alert("삭제할 여행을 선택해주세요.");
            return;
        }
        
        if (confirm("선택한 여행 일정을 삭제하시겠습니까?")) {
            removeMutation.mutate(selection);
        }
    }



    
    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < Math.min(items.length, tripListCount);

    useEffect(() => {
        setRows(items.slice((nowPage - 1) * tripListCount, Math.min(nowPage * tripListCount, items.length)).map((item) => (
            <Table.Row
                key={item.plan_id}
                data-selected={selection.includes(item.plan_id) ? "" : undefined}
                bgColor="transparent"
                h={isMobile ? "40px" : "90px"}
                fontSize={isMobile ? "13px" : "20px"}
            >
                <Table.Cell>
                    <Checkbox.Root
                        size="sm"
                        pl={isMobile ? "10px" : "30px"}
                        top="0.5"
                        aria-label="Select row"
                        checked={selection.includes(item.plan_id)}
                        onCheckedChange={(changes) => {
                            setSelection((prev) =>
                                changes.checked
                                  ? [...prev, item.plan_id]
                                  : selection.filter((id) => id !== item.plan_id),
                            )
                        }}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Table.Cell>
                <Table.Cell
                    onClick={() => {
                        navigate(`/aboutrip?id=${item.plan_id}`);
                    }}
                
                    cursor="pointer"
                >{item.location.join(", ")}</Table.Cell>
                <Table.Cell
                    onClick={() => {
                        navigate(`/aboutrip?id=${item.plan_id}`);
                    }}
                
                    cursor="pointer"
                >{item.taste["accommodation_taste"].length > 0 ? `${item.taste["accommodation_taste"][0]}, ` : null}{item.taste["destination_taste"].length > 0 ? `${item.taste["destination_taste"][0]}, ` : null}{item.taste["restaurant_taste"].length > 0 ? `${item.taste["restaurant_taste"][0]}, ` : null}</Table.Cell>
                <Table.Cell
                    onClick={() => {
                        navigate(`/aboutrip?id=${item.plan_id}`);
                    }}
                
                    cursor="pointer"
                    textAlign="end"
                >{item.plan_start}</Table.Cell>
                <Table.Cell
                    onClick={() => {
                        navigate(`/aboutrip?id=${item.plan_id}`);
                    }}
                
                    cursor="pointer"
                    textAlign="end"
                    pr={isMobile ? "5px" : "40px"}
                >{item.plan_end}</Table.Cell>
            </Table.Row>
        )))
    }
    , [items, selection, nowPage, tripListCount]);


    // 페이지 변경 시 선택된 여행 일정 초기화
    useEffect(() => {
        setSelection([]);
    }, [nowPage])

    return (
        <>
            {
                items.length > 0 ? (
                    <Flex
                        w="100%"
                        h="100vh"

                        py="20px"
                        px={isMobile ? "5px" : "50px"}

                        alignItems="center"
                        direction="column"

                        className="light"
                    >
                    
                        {/* 상단바 */}
                        <Flex
                            px={isMobile ? undefined : "30px"}
                            h={isMobile ? "50px" : "90px"}

                            w="100%"

                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Flex
                                alignItems="center"
                                gap={isMobile ? "5px" : "40px"}
                            >
                                {/* 선택 삭제 버튼 */}
                                <Flex
                                    w={isMobile ? "75px" : "126px"}
                                    h={isMobile ? "30px" : "40px"}

                                    bgColor="#FFDFDF"
                                    borderRadius="5px"

                                    justifyContent="center"
                                    alignItems="center"

                                    transition="all 0.2s ease-in-out"
                                    cursor="pointer"

                                    _hover={{
                                        bgColor: "#FFCACA",
                                    }}

                                    onClick={rmSelectedTrip}
                                >
                                    <Text
                                        color="#F06E6E"
                                        fontSize={isMobile ? "13px" : "16px"}
                                    >
                                        선택 삭제
                                    </Text>
                                </Flex>
                                
                                <Text
                                    fontWeight="lighter"

                                    fontSize={isMobile ? "14px" : ""}
                                >
                                    {`${selection.length}개 선택됨`}
                                </Text>
                            </Flex>
                                
                            <Flex
                                gap={isMobile ? "" : "50px"}
                                h="100%"
                            >
                                <Flex
                                    h="100%"
                                    alignItems="center"
                                
                                    gap={isMobile ? "" : "70px"}
                                >
                                    <Text
                                        fontSize={isMobile ? "13px" : "20px"}
                                        whiteSpace="nowrap"
                                    >
                                        표시:
                                    </Text>
                                
                                    <NativeSelect.Root variant="plain">
                                        <NativeSelect.Field
                                            outline="none"
                                            value={tripListCount}
                                            onChange={(e) => {
                                                setTripListCount(Number(e.target.value));
                                            }}
                                            fontSize={isMobile ? "13px" : "20px"}
                                        >
                                            {
                                                tripListPageSizeList.map((count) => (
                                                    <option key={count} value={count}>
                                                        {count}
                                                    </option>
                                                ))
                                            }
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Flex>
                                        
                                <Flex
                                    h="100%"
                                    alignItems="center"
                                >
                                    <Text
                                        fontSize={isMobile ? "13px" : "20px"}
                                        
                                    >
                                        총 {items.length}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                                        
                        <Table.ScrollArea
                            h="100%"
                            w="100%"
                        >
                            <Table.Root
                                fontWeight="lighter"
                                stickyHeader
                            >
                                {/* 헤더 */}
                                <Table.Header>
                                    <Table.Row
                                        h={isMobile ? "40px" : "90px"}
                                        bgColor="#EFEFEF"
                                        fontSize={isMobile ? "13px" : "20px"}
                                    >
                                        <Table.ColumnHeader w="6" pl={isMobile ? "20px" : "40px"}>
                                            <Checkbox.Root
                                                size="sm"
                                                top="0.5"
                                                aria-label="Select all rows"
                                                checked={indeterminate ? "indeterminate" : selection.length > 0}
                                                onCheckedChange={(changes) => {
                                                    setSelection (
                                                        changes.checked ? items.slice((nowPage - 1) * tripListCount, Math.min(nowPage * tripListCount, items.length)).map((item) => item.plan_id) : [],
                                                    )
                                                }}
                                            >
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control />
                                            </Checkbox.Root>
                                        </Table.ColumnHeader>
                                            
                                        <Table.ColumnHeader>여행지</Table.ColumnHeader>
                                        <Table.ColumnHeader>취향 태그</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end">시작 날짜</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end" pr={isMobile ? "" : "40px"}>끝 날짜</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                {/* 메인 데이터 공간 */}
                                <Table.Body>{rows}</Table.Body>
                            </Table.Root>
                        </Table.ScrollArea>
                                            
                        {/* 페이지네이션 */}
                        <Pagination.Root
                            count={items.length}
                            pageSize={tripListCount}
                            page={nowPage}
                            onPageChange={(e) => {setNowPage(e.page)}}
                                            
                            mt={isMobile ? "10px" : "30px"}
                        >
                            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                                            
                                {/* 왼쪽 아이콘 */}
                                <Pagination.PrevTrigger asChild>
                                    <IconButton
                                        outline="none"
                                        border="0"
                                        bgColor="transparent"
                                        _focus={{
                                            border: "0",
                                            outline: "none",
                                        }}
                                    >
                                        <LuChevronLeft
                                            color="#696969"
                                        />
                                    </IconButton>
                                </Pagination.PrevTrigger>
                                            
                                <Pagination.Items
                                    render={(page) => (
                                        <IconButton
                                            variant={{ base: "ghost" }}
                                            color="#696969"
                                            outline="none"
                                            border={page.value !== nowPage ? "1px solid #E0E7EE" : "0"}
                                            bgColor={page.value === nowPage ? "#E0E7EE" : "transparent"}
                                            _focus={{
                                                border: "0",
                                                outline: "none",
                                            }}

                                            transition="background 0.2s ease-in-out"
                                        >
                                            {page.value}
                                        </IconButton>
                                    )}
                                />

                                {/* 오른쪽 아이콘 */}
                                <Pagination.NextTrigger asChild>
                                    <IconButton
                                        outline="none"
                                        border="0"
                                        bgColor="transparent"
                                        _focus={{
                                            border: "0",
                                            outline: "none",
                                        }}
                                    >
                                        <LuChevronRight
                                            color="#696969"
                                        />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </Flex>
                ) : (
                    <NotFoundSchedule />
                )
            }
        </>
    );
}