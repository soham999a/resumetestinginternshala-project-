import React from "react";
import { Box, Button, Text, VStack, Icon } from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";

export default function FileUpload({ onParse }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Mock parse: just send dummy data
    onParse({
      name: "John Doe",
      summary: "Experienced developer...",
      experience: [{ company: "ABC Corp", role: "Engineer", years: 2 }],
      education: [{ school: "XYZ University", degree: "BSc", year: 2020 }],
      skills: ["Python", "React"]
    });
  };

  return (
    <Box p={8} bg="white" borderRadius="xl" boxShadow="lg" textAlign="center">
      <VStack spacing={4}>
        <Icon as={FiUploadCloud} w={12} h={12} color="teal.400" />
        <Text fontSize="lg" fontWeight="bold">Upload your resume</Text>
        <Text color="gray.500">Accepts .pdf or .docx (mocked parsing)</Text>
        <Button as="label" colorScheme="teal" variant="solid" cursor="pointer">
          Select File
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFile}
            hidden
          />
        </Button>
      </VStack>
    </Box>
  );
} 