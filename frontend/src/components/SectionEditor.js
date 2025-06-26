import React, { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  Input,
  VStack,
  HStack,
  Heading,
  IconButton,
  StackDivider,
  useToast,
  Text,
  Tag,
  TagCloseButton,
  TagLabel
} from "@chakra-ui/react";
import { FiPlus, FiTrash2, FiZap } from "react-icons/fi";

export default function SectionEditor({ title, section, value, onChange, isList }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleEnhance = async () => {
    setLoading(true);
    try {
      const content = isList ? JSON.stringify(value) : value;
      const res = await fetch("http://localhost:8000/ai-enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, content }),
      });
      const data = await res.json();
      onChange(isList ? JSON.parse(data.enhanced_content.replace(/^✨ Enhanced: | ✨$/g, "")) : data.enhanced_content);
      toast({ title: `Enhanced ${title}`, status: "success", duration: 1500, isClosable: true });
    } catch (e) {
      toast({ title: "Enhancement failed", status: "error", duration: 2000, isClosable: true });
    }
    setLoading(false);
  };

  if (isList && section === "skills") {
    // Render skills as tags
    return (
      <Box mb={6}>
        <Heading as="h3" size="md" mb={2} color="teal.500">{title}</Heading>
        <HStack spacing={2} wrap="wrap" mb={2}>
          {Array.isArray(value) && value.map((skill, idx) => (
            <Tag key={idx} colorScheme="teal" borderRadius="full">
              <TagLabel>{skill}</TagLabel>
              <TagCloseButton onClick={() => onChange(value.filter((_, i) => i !== idx))} />
            </Tag>
          ))}
        </HStack>
        <HStack>
          <Input
            placeholder="Add a skill"
            size="sm"
            onKeyDown={e => {
              if (e.key === "Enter" && e.target.value.trim()) {
                onChange([...value, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
            maxW="200px"
          />
          <Button leftIcon={<FiZap />} colorScheme="teal" size="sm" onClick={handleEnhance} isLoading={loading}>
            Enhance with AI
          </Button>
        </HStack>
      </Box>
    );
  }

  if (isList) {
    return (
      <Box mb={6}>
        <Heading as="h3" size="md" mb={2} color="teal.500">{title}</Heading>
        <VStack align="stretch" spacing={2} divider={<StackDivider />}>
          {Array.isArray(value) && value.map((item, idx) => (
            <HStack key={idx} align="start">
              <Input
                value={JSON.stringify(item)}
                onChange={e => {
                  const arr = [...value];
                  arr[idx] = JSON.parse(e.target.value);
                  onChange(arr);
                }}
                size="sm"
                fontFamily="mono"
              />
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="ghost"
                aria-label="Remove"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
              />
            </HStack>
          ))}
        </VStack>
        <Button leftIcon={<FiPlus />} mt={2} size="sm" onClick={() => onChange([...value, {}])}>
          Add
        </Button>
        <Button leftIcon={<FiZap />} colorScheme="teal" size="sm" ml={2} onClick={handleEnhance} isLoading={loading}>
          Enhance with AI
        </Button>
      </Box>
    );
  }

  return (
    <Box mb={6}>
      <Heading as="h3" size="md" mb={2} color="teal.500">{title}</Heading>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        size="md"
        minH="80px"
        mb={2}
        placeholder={`Enter your ${title.toLowerCase()}...`}
      />
      <Button leftIcon={<FiZap />} colorScheme="teal" size="sm" onClick={handleEnhance} isLoading={loading}>
        Enhance with AI
      </Button>
    </Box>
  );
} 