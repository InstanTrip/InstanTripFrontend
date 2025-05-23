import { Box, Flex, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";

import { logout } from "@/utils/Api";

import RippleButton from "../Misc/RippleButton";
import task_list_icon from "../../assets/task_list_icon.svg";
import setting_icon from "../../assets/setting_icon.svg";
import logout_icom from "../../assets/logout_icon.svg";

export default function SideBar({ page, setPage }: { page: string; setPage: (page: string) => void }) {
    const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
    const sideBarWidth = useBreakpointValue({ base: "50px", md: "270px" });


    const handleLogout = () => {
        logout();
        // 로그아웃 후 강제로 홈으로
        window.location.href = "/";
    }

    return (
        <Flex
            h="100%"
            w={sideBarWidth}
            borderRight="1px solid #DADADA"
            py="40px"
            direction="column"
            transition="all 0.2s ease-in-out"
        >
            <Box pl="50px">
                <Link
                    fontSize="40px"
                    fontWeight="lighter"
                    color="#757575"
                    outline="none"
                    _hover={{
                        fontWeight: "lighter",
                        color: "#757575",
                    }}
                    href="/"

                    display={isMobile ? "none" : "block"}
                >
                    InstanTrip.
                </Link>
            </Box>
            
            <Flex
                mt="100px"
                justifyContent="center"
            >
                <Box
                    overflow="hidden"
                    rounded="13px"
                >
                    <RippleButton>
                        <Flex
                            w={isMobile ? "40px" : "190px"}
                            h={isMobile ? "40px" : "57px"}
                            bgColor={page === "schedule" ? "#E9ECF0" : ""}
                            alignItems="center"
                            justifyContent={isMobile ? "center" : "flex-start"}
                            pl={isMobile ? "" : "20px"}
                            gap="10px"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: "rgba(0, 0, 0, 0.03)",
                            }}
                            onClick={() => setPage("schedule")}
                            >
                            <Image
                                w="16px"
                                h="16px"
                                src={task_list_icon}
                            />
                            <Text
                                color="#696969"
                                display={isMobile ? "none" : "block"}
                            >
                                일정 관리
                            </Text>
                        </Flex>
                    </RippleButton>
                </Box>
            </Flex>

            <Flex
                mt="18px"
                justifyContent="center"
            >
                <Box
                    overflow="hidden"
                    rounded="13px"
                >
                    <RippleButton>
                        <Flex
                            w={isMobile ? "40px" : "190px"}
                            h={isMobile ? "40px" : "57px"}
                            bgColor={page === "user_info_edit" ? "#E9ECF0" : ""}
                            alignItems="center"
                            justifyContent={isMobile ? "center" : "flex-start"}
                            pl={isMobile ? "" : "20px"}
                            gap="10px"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: "rgba(0, 0, 0, 0.03)",
                            }}
                            onClick={() => setPage("user_info_edit")}
                        >
                            <Image
                                w="16px"
                                h="16px"
                                src={setting_icon}
                            />
                            <Text
                                color="#696969"
                                display={isMobile ? "none" : "block"}
                            >
                                회원정보 변경
                            </Text>
                        </Flex>
                    </RippleButton>
                </Box>
            </Flex>

            <Flex
                mt="auto"
                justifyContent="center"
            >
                <Flex
                    alignItems="center"
                    w="190px"
                    h="57px"
                >
                    <Box
                        w={isMobile ? "100%" : "70%"}
                        h="100%"
                    >
                        <Box
                            w="100%"
                            h="100%"
                            rounded="13px"
                            overflow="hidden"
                        >
                            <RippleButton>
                                <Flex
                                    w="100%"
                                    h="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="3px"
                                    _hover={{
                                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                                    }}
                                    transition="all 0.2s ease-in-out"
                                    cursor="pointer"
                                    onClick={handleLogout}
                                >
                                    <Image
                                        src={logout_icom}
                                        w="20px"
                                        h="20px"
                                    />
                                    <Text
                                        color="#696969"
                                        display={isMobile ? "none" : "block"}
                                    >
                                        로그아웃
                                    </Text>
                                </Flex>
                            </RippleButton>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}