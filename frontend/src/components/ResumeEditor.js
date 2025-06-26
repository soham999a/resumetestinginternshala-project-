import React, { useState } from "react";
import { Box, Button, VStack, HStack, Input, useToast, Divider, Heading, Spacer } from "@chakra-ui/react";
import SectionEditor from "./SectionEditor";

export default function ResumeEditor({ resume, setResume }) {
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleChange = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("http://localhost:8000/save-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume }),
    });
    setSaving(false);
    toast({ title: "Resume saved!", status: "success", duration: 2000, isClosable: true });
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "resume.json");
    dlAnchorElem.click();
  };

  return (
    <Box p={8} bg="white" borderRadius="xl" boxShadow="lg">
      <VStack spacing={6} align="stretch">
        <HStack>
          <Heading as="h2" size="lg" color="teal.600">Edit Resume</Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={handleSave} isLoading={saving}>
            Save Resume
          </Button>
          <Button variant="outline" colorScheme="teal" onClick={handleDownload}>
            Download JSON
          </Button>
        </HStack>
        <Divider />
        <Box>
          <Input
            placeholder="Full Name"
            size="lg"
            value={resume.name}
            onChange={e => handleChange("name", e.target.value)}
            mb={4}
            fontWeight="bold"
          />
          <SectionEditor
            title="Summary"
            section="summary"
            value={resume.summary}
            onChange={val => handleChange("summary", val)}
          />
          <SectionEditor
            title="Experience"
            section="experience"
            value={resume.experience}
            onChange={val => handleChange("experience", val)}
            isList
          />
          <SectionEditor
            title="Education"
            section="education"
            value={resume.education}
            onChange={val => handleChange("education", val)}
            isList
          />
          <SectionEditor
            title="Skills"
            section="skills"
            value={resume.skills}
            onChange={val => handleChange("skills", val)}
            isList
          />
        </Box>
      </VStack>
    </Box>
  );
} 