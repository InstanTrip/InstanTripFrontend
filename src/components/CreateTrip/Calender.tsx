import React from "react";
import { Flex } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ko } from 'date-fns/locale';

registerLocale('ko', ko)

export default function Calender({
    startDate,
    setStartDate,
    endDate,
    setEndDate
}: {
    startDate: Date | null,
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>,
    endDate: Date | null,
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
}) {
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
        >
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