import { Box, Text, Link } from "@chakra-ui/react";

import ProfileCard from "./ProfileCard";

export default function ServiceInfo() {
    return (
        <Box
            p="30px"
            h="100vh"
            overflow="scroll"
        >
            <Text
                fontSize="24px"
            >
                서비스 정보
            </Text>

            <Text mt="20px" fontSize="18px">
                개발자들
            </Text>

            <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/33373557?v=4"
                githubUrl="https://github.com/ajb3296"
                name="안재범"
                email="ajb8533296@gmail.com"
                description="풀스택 개발자"
            />
            <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/151834203?v=4"
                githubUrl="https://github.com/bini36"
                name="윤영빈"
                email="yeongbinyun54@gmail.com"
                description="프론트엔드 개발자"
            />
            <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/70587328?v=4"
                githubUrl="https://github.com/SeoBamm"
                name="서범창"
                email="20200561@kumoh.ac.kr"
                description="백엔드 개발자"
            />
            <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/151834213?v=4"
                githubUrl="https://github.com/alongleeyo"
                name="이영재"
                email="zaq6421@naver.com"
                description="백엔드 개발자"
            />


            <Text mt="20px" mb="10px" fontSize="18px">
                License
            </Text>

            <Text
                cursor="pointer"
                onClick={() => {
                    window.open("https://maplestory.nexon.com/Media/Font", "_blank");
                }}
            >
                이 서비스에는 메이플스토리가 제공한 메이플스토리 서체가 적용되어 있습니다.
            </Text>

            <Text mt="15px">
                서비스 개발에 사용된 이미지의 출처는 다음과 같습니다.
            </Text>

            <Link href="https://unsplash.com/ko/사진/태양-광선이-있는-숲의-나무-sp-p7uuT0tw">
                https://unsplash.com/ko/사진/태양-광선이-있는-숲의-나무-sp-p7uuT0tw
            </Link>
            <br />
            <Link href="https://kr.freepik.com/free-photo/portrait-beautiful-young-asian-woman-relaxing-around-beach-with-white-clouds-blue-sky-travel-vacation_11206178.htm">
                https://kr.freepik.com/free-photo/portrait-beautiful-young-asian-woman-relaxing-around-beach-with-white-clouds-blue-sky-travel-vacation_11206178.htm
            </Link>
        </Box>
    );
}
