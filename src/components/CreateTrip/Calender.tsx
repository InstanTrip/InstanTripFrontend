import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ko } from 'date-fns/locale';

registerLocale('ko', ko)

const Calender = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
        >
            <Text color="#575757" fontSize="20px" mb="10px">
                여행 기간 선택
            </Text>
            <DatePicker
                locale="ko"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
        </Flex>
    );
};

export default Calender;
