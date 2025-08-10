
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"

type ProfileCardProps = {
    imageUrl: string;
    githubUrl: string;
    name: string;
    email: string;
    description?: string;
};



const ProfileCard: React.FC<ProfileCardProps> = ({
    imageUrl,
    githubUrl,
    name,
    email,
    description,
}) => (
    <Box
        border={useColorModeValue("1px solid #e4e4e7", "1px solid #444444")}
        borderRadius="lg"
        maxW="400px"
        p={4}

        mt="10px"

        cursor="pointer"
        onClick={() => {
            // 깃허브로 이동
            window.open(githubUrl, "_blank");
        }}
    >
        <Flex
            align="center"
            gap="10px"
        >
            <Box
                borderRadius="full"
                overflow="hidden"
                width="50px"
                height="50px"
            >
                <Image src={imageUrl} mr={6} />
            </Box>
            <Box>
                <Text fontWeight="bold" fontSize="lg">
                    {name}
                </Text>
                <Text color={useColorModeValue("1px solid #e4e4e7", "1px solid #444444")} fontSize="sm">
                    {email}
                </Text>
                {description && (
                    <Text mt={2} color={useColorModeValue("1px solid #e4e4e7", "1px solid #444444")} fontSize="sm">
                        {description}
                    </Text>
                )}
            </Box>
        </Flex>
    </Box>
);

export default ProfileCard;
