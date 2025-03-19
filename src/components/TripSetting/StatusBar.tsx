import { Flex, Text, Image } from '@chakra-ui/react';
import checkmark from '../../images/checkmark.svg';

export default function StatusBar({ count }: { count: number }) {
  // 반복되는 스텝 컴포넌트를 위한 함수 생성
  const renderStep = (stepNumber: number) => {
    const isActive = count >= stepNumber;
    const isCompleted = count > stepNumber;
    
    return (
      <Flex
        w="40px"
        h="40px"
        borderRadius="50%"
        backgroundColor={isActive ? "#93E2FF" : "#D9D9D9"}
        justifyContent="center"
        alignItems="center"
      >
        <Text>
          {isCompleted ? 
            <Image w="24px" h="20px" mt="2px" src={checkmark} /> : 
            stepNumber
          }
        </Text>
      </Flex>
    );
  };

  // 반복되는 구분자 컴포넌트
  const Divider = () => (
    <Text
      fontSize="20px"
      fontWeight="bold"
      color="#D9D9D9"
    >
      · · · ·
    </Text>
  );

  return (
    <Flex
      w="216px"
      h="40px"
      justifyContent="space-between"
    >
      {renderStep(1)}
      <Divider />
      {renderStep(2)}
      <Divider />
      {renderStep(3)}
    </Flex>
  );
}
