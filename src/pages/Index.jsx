import React, { useState, useEffect } from "react";
import { Box, Text, Button, VStack, Heading, useToast, HStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSyncAlt } from "react-icons/fa";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const toast = useToast();

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds > 0) return seconds - 1;
          resetTimer();
          toast({
            title: "Time is up!",
            description: "Take a short break. You've earned it!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          return 0;
        });
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, toast]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <VStack minH="100vh" justify="center" align="center" spacing={8}>
      <Heading>Pomodoro Timer</Heading>
      <Box p={8} borderWidth="2px" borderRadius="lg">
        <Text fontSize="6xl" mb={4}>
          {formatTime(secondsLeft)}
        </Text>
        <HStack>
          <Button leftIcon={isRunning ? <FaPause /> : <FaPlay />} onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button leftIcon={<FaSyncAlt />} onClick={resetTimer}>
            Reset
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Index;
