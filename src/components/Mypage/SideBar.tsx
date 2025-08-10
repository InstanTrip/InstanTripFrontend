import { Box, Flex, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"

import { logout } from "@/utils/Api";

import RippleButton from "../Misc/RippleButton";
import task_list_icon from "../../assets/task_list_icon.svg";
import task_list_icon_for_darkmode from "../../assets/task_list_icon_for_darkmode.svg";
import setting_icon from "../../assets/setting_icon.svg";
import setting_icon_darkmode from "../../assets/setting_icon_for_darkmode.svg";
import logout_icon from "../../assets/logout_icon.svg";
import logout_icon_darkmode from "../../assets/logout_icon_for_darkmode.svg";
import info_icon from "../../assets/Info.svg";
import info_icon_darkmode from "../../assets/Info_for_darkmode.svg";
import InstantripLogo from "../../assets/instantrip.webp";

export default function SideBar({ page, setPage }: { page: string; setPage: (page: string) => void }) {
    const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
    const sideBarWidth = useBreakpointValue({ base: "50px", md: "270px" });

    const isLightMode = useColorModeValue(true, false);

    const handleLogout = () => {
        logout();
        // 로그아웃 후 강제로 홈으로
        window.location.href = "/";
    }

    return (
        <Flex
            h="100%"
            w={sideBarWidth}
            borderRight={`1px solid ${isLightMode ? "#DADADA" : "#2d2d2d"}`}
            py="40px"
            direction="column"
            transition="all 0.2s ease-in-out"
        >
            <Box pl={isMobile ? "" : "50px"}>
                <Link
                    fontSize="35px"
                    fontWeight="lighter"
                    color={isLightMode ? "#757575" : "#efefef"}
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
                <Link
                    outline="none"
                    href="/"
                    display={isMobile ? "block" : "none"}
                >
                    <Image
                        src={InstantripLogo}
                        alt="InstanTrip Logo"
                        w="50px"
                        h="50px"
                    />
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
                            bgColor={page === "schedule" ? 
                                isLightMode ? "#E9ECF0" : "#2d2d2d"
                                 : ""}
                            alignItems="center"
                            justifyContent={isMobile ? "center" : "flex-start"}
                            pl={isMobile ? "" : "20px"}
                            gap="10px"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
                            }}
                            onClick={() => setPage("schedule")}
                        >
                            <Image
                                w="16px"
                                h="16px"
                                src={isLightMode ? task_list_icon : task_list_icon_for_darkmode}
                            />
                            <Text
                                color={isLightMode ? "#696969" : "#efefef"}
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
                            bgColor={page === "user_info_edit" ? 
                                isLightMode ? "#E9ECF0" : "#2d2d2d"
                                 : ""}
                            alignItems="center"
                            justifyContent={isMobile ? "center" : "flex-start"}
                            pl={isMobile ? "" : "20px"}
                            gap="10px"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
                            }}
                            onClick={() => setPage("user_info_edit")}
                        >
                            <Image
                                w="16px"
                                h="16px"
                                src={isLightMode ? setting_icon : setting_icon_darkmode}
                            />
                            <Text
                                color={isLightMode ? "#696969" : "#efefef"}
                                display={isMobile ? "none" : "block"}
                            >
                                회원정보 변경
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
                            bgColor={page === "service_info" ? 
                                isLightMode ? "#E9ECF0" : "#2d2d2d"
                                 : ""}
                            alignItems="center"
                            justifyContent={isMobile ? "center" : "flex-start"}
                            pl={isMobile ? "" : "20px"}
                            gap="10px"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
                            }}
                            onClick={() => setPage("service_info")}
                        >
                            <Image
                                w="16px"
                                h="16px"
                                src={isLightMode ? info_icon : info_icon_darkmode}
                            />
                            <Text
                                color={isLightMode ? "#696969" : "#efefef"}
                                display={isMobile ? "none" : "block"}
                            >
                                정보
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
                                        backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
                                    }}
                                    transition="all 0.2s ease-in-out"
                                    cursor="pointer"
                                    onClick={handleLogout}
                                >
                                    <Image
                                        src={isLightMode ? logout_icon : logout_icon_darkmode}
                                        w="20px"
                                        h="20px"
                                    />
                                    <Text
                                        color={isLightMode ? "#696969" : "#efefef"}
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