import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Background from '../assets/login_pic.png';

export default function Login() {
    // 로그인 페이지
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false); 
    const [isSignUp, setIsSignUp] = useState(false); // 회원가입 여부
    const [isForgotPassword, setIsForgotPassword] = useState(false); // 비밀번호 찾기 여부

    const handleLogin = () => {
        // 로그인 처리 로직
        if (id === 'test' && password === 'password') {
            setIsLogin(true);
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };
    const handleSignUp = () => {
        // 회원가입 처리 로직
        setIsSignUp(true);
    };
}    