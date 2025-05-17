import { useState } from 'react';
import { Flex, Grid, GridItem, Box, Text, Input, Button } from '@chakra-ui/react';

export default function ChangeUserInfo() {
    const [userId, setUserId] = useState("testID");
    const [userEmail, setUserEmail] = useState("testEmail");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRetry, setNewPasswordRetry] = useState("");
    const [userName, setUserName] = useState("");
    const [userCurrentPassword, setUserCurrentPassword] = useState("");

    return (
        <Flex
            w="100%"
            h="100%"
            
            justifyContent="center"
        >
            <Box
                w="1000px"
                py="50px"
            >
                <Text
                    fontSize="35px"
                    color="#9B9B9B"
                >
                    회원정보 변경
                </Text>

                <Grid
                    border="1px solid #BCBCBC"
                    borderBottom="none"
                    templateColumns="repeat(5, 1fr)"

                    mt="30px"
                >

                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        h="160px"
                        bgColor="#E7E7E7"
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize="20px"
                                color="#6D6767"
                            >
                                EMAIL
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px="30px"

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Flex w="100%"
                                flexDirection="column"

                                gap="10px"
                            >
                                <Flex
                                    w="100%"
                                    h="50px"

                                    gap="10px"
                                >
                                    <Input
                                        placeholder="이메일을 입력하세요"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}

                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"

                                        w="100%"
                                        h="100%"
                                    />
                                    <Button
                                        h="100%"
                                        w="120px"

                                        bgColor="#93E2FF"

                                        _hover={{
                                            bgColor: "#81D4F2"
                                        }}
                    
                                        transition="all 0.3s ease-in-out"
                                    >
                                        <Text
                                            color="white"
                                        >
                                            인증번호 전송
                                        </Text>
                                    </Button>
                                </Flex>
                                <Flex
                                    w="100%"
                                    h="50px"

                                    gap="10px"
                                >
                                    <Input
                                        placeholder="인증번호를 입력하세요"
                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"
                                        w="100%"
                                        h="100%"
                                    />
                                    <Button
                                        h="100%"
                                        w="120px"

                                        bgColor="#93E2FF"

                                        _hover={{
                                            bgColor: "#81D4F2"
                                        }}
                    
                                        transition="all 0.3s ease-in-out"
                                    >
                                        <Text
                                            color="white"
                                        >
                                            인증
                                        </Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>

                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        h="160px"
                        bgColor="#E7E7E7"
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize="20px"
                                color="#6D6767"
                            >
                                비밀번호 변경
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px="30px"

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Flex w="100%"
                                flexDirection="column"

                                gap="10px"
                            >
                                <Flex
                                    w="100%"
                                    h="50px"
                                >
                                    <Input
                                        placeholder="새 비밀번호"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}

                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"

                                        w="100%"
                                        h="100%"
                                    />
                                </Flex>
                                <Flex
                                    w="100%"
                                    h="50px"
                                >
                                    <Input
                                        placeholder="비밀번호 확인"
                                        value={newPasswordRetry}
                                        onChange={(e) => setNewPasswordRetry(e.target.value)}

                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"

                                        w="100%"
                                        h="100%"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>

                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        h="80px"
                        bgColor="#E7E7E7"
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize="20px"
                                color="#6D6767"
                            >
                                이름
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px="30px"

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Flex w="100%"
                                flexDirection="column"

                                gap="10px"
                            >
                                <Flex
                                    w="100%"
                                    h="50px"
                                >
                                    <Input
                                        placeholder="이름을 입력하세요"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}

                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"

                                        w="100%"
                                        h="100%"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>

                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        h="80px"
                        bgColor="#E7E7E7"
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize="20px"
                                color="#6D6767"
                            >
                                기존 비밀번호
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        borderBottom="1px solid #BCBCBC"
                        colSpan={4}
                    >
                        <Flex
                            w="100%"
                            h="100%"

                            px="30px"

                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Flex w="100%"
                                flexDirection="column"

                                gap="10px"
                            >
                                <Flex
                                    w="100%"
                                    h="50px"
                                >
                                    <Input
                                        placeholder="보안을 위해 기존 비밀번호를 다시 확인합니다"
                                        value={userCurrentPassword}
                                        onChange={(e) => setUserCurrentPassword(e.target.value)}

                                        border="1px solid #BCBCBC"
                                        borderRadius="10px"

                                        w="100%"
                                        h="100%"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>
                </Grid>


                <Flex
                    w="100%"
                    h="60px"
                    mt="30px"

                    justifyContent="center"
                    alignItems="center"

                    cursor="pointer"

                    bgColor="#93E2FF"
                    rounded="5px"
                    
                    _hover={{
                        bgColor: "#81D4F2"
                    }}

                    transition="all 0.3s ease-in-out"
                >
                    <Text
                        color="white"
                        fontSize="25px"
                    >
                        변경내용 저장
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
}