"use client";

import { Textarea, Button, ButtonGroup, Input } from "@heroui/react";
import { useState, useRef } from "react";
import "./editor.css";

interface CKEditorComponentProps {
  content: string;
  onChange: (content: string) => void;
}

export default function CKEditorComponent({
  content,
  onChange,
}: CKEditorComponentProps) {
  const [text, setText] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (value: string) => {
    setText(value);
    onChange(value);
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end);

    handleChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText
        ? start + before.length + selectedText.length + after.length
        : start + before.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          if (data.success) {
            const alt = prompt('Enter image alt text (optional):') || 'Image';
            insertText(`![${alt}](${data.url})`);
          } else {
            alert('Failed to upload image');
          }
        } catch (error) {
          alert('Error uploading image');
        }
      }
    };
    input.click();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    const linkText = prompt("Enter link text:") || "Link";
    if (url) {
      insertText(`[${linkText}](${url})`);
    }
  };

  return (
    <div className="space-y-2">
      <ButtonGroup size="sm" variant="flat">
        <Button onPress={() => insertText("**", "**")}>Bold</Button>
        <Button onPress={() => insertText("*", "*")}>Italic</Button>
        <Button onPress={() => insertText("`", "`")}>Code</Button>
        <Button onPress={() => insertText("```\n", "\n```")}>Code Block</Button>
        <Button onPress={() => insertText("## ")}>Heading</Button>
        <Button onPress={() => insertText("- ")}>List</Button>
        <Button onPress={() => insertText("> ")}>Quote</Button>
        <Button onPress={insertImage}>Upload Image</Button>
        <Button onPress={insertLink}>Link</Button>
      </ButtonGroup>

      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your content here... Use the buttons above for formatting."
        minRows={15}
        className="font-mono"
      />

      <div className="text-sm text-default-500">
        Supports Markdown: **bold**, *italic*, `code`, ```code blocks```, ##
        headings, - lists, quotes
      </div>
    </div>
  );
}
