import React, { useState } from "react";
import {
    Flex,
    Text,
    Input,
    Button,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"

export default function Taste({
    destinationTaste,
    setDestinationTaste,
    foodTaste,
    setFoodTaste,
    accommodationTaste,
    setAccommodationTaste
}: {
    destinationTaste: string[],
    setDestinationTaste: React.Dispatch<React.SetStateAction<string[]>>,
    foodTaste: string[],
    setFoodTaste: React.Dispatch<React.SetStateAction<string[]>>,
    accommodationTaste: string[],
    setAccommodationTaste: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const isLightMode = useColorModeValue(true, false);
    
    // 입력 필드 상태 관리
    const [destinationInput, setDestinationInput] = useState("");
    const [foodInput, setFoodInput] = useState("");
    const [accommodationInput, setAccommodationInput] = useState("");
    
    // 태그 추가 함수
    const addTag = (
        input: string, 
        setInput: React.Dispatch<React.SetStateAction<string>>,
        tags: string[],
        setTags: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (input.trim() !== "" && !tags.includes(input.trim())) {
            setTags([...tags, input.trim()]);
            setInput("");
        }
    };
    
    // 태그 제거 함수
    const removeTag = (
        index: number,
        tags: string[],
        setTags: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setTags(tags.filter((_, i) => i !== index));
    };
    
    // 키 입력 핸들러 (Enter 키 처리)
    const handleKeyDown = (
        e: React.KeyboardEvent,
        input: string,
        setInput: React.Dispatch<React.SetStateAction<string>>,
        tags: string[],
        setTags: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(input, setInput, tags, setTags);
        }
    };

    // 태그 렌더링 함수
    const renderTags = (
        tags: string[], 
        setTags: React.Dispatch<React.SetStateAction<string[]>>,
        colorScheme: string
    ) => {
        return tags.map((tag, index) => (
            <Flex
                key={index}
                bg={`${colorScheme}.500`}
                color="white"
                borderRadius="full"

                px="10px"
                py="5px"
                
                display="inline-flex"
                alignItems="center"

                gap="4px"
            >
                <Text fontSize="sm">{tag}</Text>
                <Flex
                    fontSize="xs"
                    onClick={() => removeTag(index, tags, setTags)}
                    alignItems="center"
                    justifyContent="center"
                    w="16px"
                    h="16px"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.3)"
                    _hover={{ bg: "rgba(255,255,255,0.5)" }}
                >
                    <Text
                        fontSize="10px"
                    >
                        ✕
                    </Text>
                </Flex>
            </Flex>
        ));
    };




    const width = useBreakpointValue({ base: "100vw", md: "600px" });

    return (
        <Flex
            w={width}

            px="15px"

            direction="column"

            alignItems="center"
            justifyContent="center"
        >
            <Flex
                w="100%"
                gap={6}
                direction="column"
            >
                <Flex
                    direction="column"
                >
                    <Text
                        color={isLightMode ? "#575757" : "#ddd"}
                        fontSize="20px"
                    >
                        여행지 취향
                    </Text>
                    <Flex
                        gap="5px"
                    >
                        <Input
                            value={destinationInput}
                            onChange={(e) => setDestinationInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, destinationInput, setDestinationInput, destinationTaste, setDestinationTaste)}
                            placeholder="Ex) 바다, 산, 인스타"

                            border={isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d"}

                            _focus={{
                                border: isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d",
                                outline: "none",
                            }}
                        />
                        <Button 
                            onClick={() => addTag(destinationInput, setDestinationInput, destinationTaste, setDestinationTaste)}
                            bg={isLightMode ? "#E9ECF0" : "#2d2d2d"}
                            color={isLightMode ? "#575757" : "#dddddd"}

                            transition="all 0.2s ease-in-out"
                            outline="none"
                            border="none"

                            _hover={{
                                bg: isLightMode ? "#93E2FF" : "#4682B4",
                                color: "white",
                            }}
                            _focus={{
                                border: "none",
                                outline: "none",
                            }}
                        >
                            추가
                        </Button>
                    </Flex>
                    <Flex flexWrap="wrap" mt="5px" gap="5px">
                        {renderTags(destinationTaste, setDestinationTaste, "blue")}
                    </Flex>
                </Flex>
                
                <Flex
                    direction="column"
                >
                    <Text
                        color={isLightMode ? "#575757" : "#ddd"}
                        fontSize="20px"
                    >
                        음식 취향
                    </Text>
                    <Flex
                        gap="5px"
                    >
                        <Input
                            value={foodInput}
                            onChange={(e) => setFoodInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, foodInput, setFoodInput, foodTaste, setFoodTaste)}
                            placeholder="Ex) 치킨, 한식, 달콤한, 전통음식"
                            
                            border={isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d"}

                            _focus={{
                                border: isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d",
                                outline: "none",
                            }}
                        />
                        <Button 
                            onClick={() => addTag(foodInput, setFoodInput, foodTaste, setFoodTaste)}
                            bg={isLightMode ? "#E9ECF0" : "#2d2d2d"}
                            color={isLightMode ? "#575757" : "#dddddd"}

                            transition="all 0.2s ease-in-out"
                            outline="none"
                            border="none"

                            _hover={{
                                bg: isLightMode ? "#93E2FF" : "#4682B4",
                                color: "white",
                            }}
                            _focus={{
                                border: "none",
                                outline: "none",
                            }}
                        >
                            추가
                        </Button>
                    </Flex>
                    <Flex flexWrap="wrap" mt="5px" gap="5px">
                        {renderTags(foodTaste, setFoodTaste, "green")}
                    </Flex>
                </Flex>
                
                <Flex
                    direction="column"
                >
                    <Text
                        color={isLightMode ? "#575757" : "#ddd"}
                        fontSize="20px"
                    >
                        숙소 취향
                    </Text>
                    <Flex
                        gap="5px"
                    >
                        <Input
                            value={accommodationInput}
                            onChange={(e) => setAccommodationInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, accommodationInput, setAccommodationInput, accommodationTaste, setAccommodationTaste)}
                            placeholder="Ex) 편안한, 호텔, 리조트"
                            
                            border={isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d"}

                            _focus={{
                                border: isLightMode ? "1px solid rgb(207, 207, 207)" : "1px solid #2d2d2d",
                                outline: "none",
                            }}
                        />
                        <Button
                            onClick={() => addTag(accommodationInput, setAccommodationInput, accommodationTaste, setAccommodationTaste)}
                            bg={isLightMode ? "#E9ECF0" : "#2d2d2d"}
                            color={isLightMode ? "#575757" : "#dddddd"}

                            transition="all 0.2s ease-in-out"
                            outline="none"
                            border="none"

                            _hover={{
                                bg: isLightMode ? "#93E2FF" : "#4682B4",
                                color: "white",
                            }}
                            _focus={{
                                border: "none",
                                outline: "none",
                            }}
                        >
                            추가
                        </Button>
                    </Flex>
                    <Flex flexWrap="wrap" mt="5px" gap="5px">
                        {renderTags(accommodationTaste, setAccommodationTaste, "purple")}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}