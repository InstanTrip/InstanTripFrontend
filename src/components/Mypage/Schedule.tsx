import React, { useState, useEffect } from "react"
import { Flex, Text, Table, Checkbox, Pagination, ButtonGroup, IconButton, NativeSelect, useBreakpointValue } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

import NotFoundSchedule from "./NotFoundSchedule";

export default function Schedule() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    // 선택된 여행들 아이디 값
    const [selection, setSelection] = useState<number[]>([]);
    // 한번에 보여줄 여행 일정 개수
    const [tripListCount, setTripListCount] = useState<number>(15);
    // 현재 페이지
    const [nowPage, setNowPage] = useState<number>(1);

    // 여행 일정 목록을 보여줄 행들
    const [rows, setRows] = useState<React.ReactElement[]>([]);

    // 여행 일정 개수
    const tripListPageSizeList = [15, 30, 50];

    // 여행 일정 목록
    const [items, setItems] = useState([
        { id: 1, travel_destination: "1안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-01", end_date: "2023-10-02", },
        { id: 2, travel_destination: "2안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-02", end_date: "2023-10-03", },
        { id: 3, travel_destination: "3안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-03", end_date: "2023-10-07", },
        { id: 4, travel_destination: "4안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-04", end_date: "2023-10-06", },
        { id: 5, travel_destination: "5안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 6, travel_destination: "6안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 7, travel_destination: "7안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 8, travel_destination: "8안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 9, travel_destination: "9안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 10, travel_destination: "10서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 11, travel_destination: "11서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 12, travel_destination: "12서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 13, travel_destination: "13서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 14, travel_destination: "14서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 15, travel_destination: "15서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 16, travel_destination: "16서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 17, travel_destination: "17서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 18, travel_destination: "18서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 19, travel_destination: "19서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 20, travel_destination: "20서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 21, travel_destination: "21서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 22, travel_destination: "22서울시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 23, travel_destination: "23안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 24, travel_destination: "24안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 25, travel_destination: "25안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 26, travel_destination: "26안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 27, travel_destination: "27안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 28, travel_destination: "28안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 29, travel_destination: "29안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 30, travel_destination: "30안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 31, travel_destination: "31안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
        { id: 32, travel_destination: "32안동시, 구미시", taste: ["치킨", "술", "바다"], start_date: "2023-10-05", end_date: "2023-10-10", },
    ]);

    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < Math.min(items.length, tripListCount);

    useEffect(() => {
        setRows(items.slice((nowPage - 1) * tripListCount, Math.min(nowPage * tripListCount, items.length)).map((item) => (
            <Table.Row
                key={item.id}
                data-selected={selection.includes(item.id) ? "" : undefined}
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
                        checked={selection.includes(item.id)}
                        onCheckedChange={(changes) => {
                            setSelection((prev) =>
                                changes.checked
                                  ? [...prev, item.id]
                                  : selection.filter((id) => id !== item.id),
                            )
                        }}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Table.Cell>

                <Table.Cell>{item.travel_destination}</Table.Cell>
                <Table.Cell>{item.taste.join(", ")}</Table.Cell>
                <Table.Cell textAlign="end">{item.start_date}</Table.Cell>
                <Table.Cell textAlign="end" pr={isMobile ? "5px" : "40px"}>{item.end_date}</Table.Cell>
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
                                                        changes.checked ? items.slice((nowPage - 1) * tripListCount, Math.min(nowPage * tripListCount, items.length)).map((item) => item.id) : [],
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