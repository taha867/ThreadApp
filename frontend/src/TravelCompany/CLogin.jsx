import {
    Box,
    Button,
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Icon,
    Text,
  } from "@chakra-ui/react";
  import { FaBuilding } from "react-icons/fa";
  import theme from "../components/theme";
  import { useState } from "react";
  import useShowToast from "../hooks/useShowToast";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../CAtom/CauthAtom";  

  export default function TravelCompanyLoginForm() {
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const setAuthScreen = useSetRecoilState(authScreenAtom);
  
    const showToast = useShowToast();
  
    const handleLogin = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/travelcompany/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Success", "Login successful!", "success");
        // Redirect or handle success
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ChakraProvider theme={theme}>
        <Box
          minHeight="100vh"
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(10px)"
            backgroundColor={useColorModeValue("white", "gray.800")}
            borderRadius="xl"
            boxShadow="xl"
            p={8}
            maxWidth="400px"
            width="90%"
          >
            <Icon as={FaBuilding} w={10} h={10} color="teal.400" mb={4} />
            <Heading mb={6} color={useColorModeValue("teal.600", "teal.200")}>
              Travel Company Login
            </Heading>
            <Stack spacing={4} width="100%">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, email: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, password: e.target.value }))
                  }
                />
              </FormControl>
              <Button
                size="lg"
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
                onClick={handleLogin}
                isLoading={loading}
              >
                Log in
              </Button>
            </Stack>
            <Text mt={6}>
            Don&apos;t have an account?{" "}
            <Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
              Signup
            </Link>
          </Text>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  }
  