"use client";

import { useState, useEffect } from "react";
import "./editor.css";

type EditorInstance = {
  getData: () => string;
};

interface CKEditorComponentProps {
  content: string;
  onChange: (event: unknown, editor: EditorInstance) => void;
}

export default function CKEditorComponent({
  content,
  onChange,
}: CKEditorComponentProps) {
  const [EditorLoaded, setEditorLoaded] = useState(false);
  const [CKEditor, setCKEditor] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    const loadEditor = async () => {
      const { CKEditor } = await import("@ckeditor/ckeditor5-react");
      const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
        .default;
      setCKEditor(() => CKEditor);
      setClassicEditor(() => ClassicEditor);
      setEditorLoaded(true);
    };

    loadEditor();
  }, []);

  if (!EditorLoaded || !CKEditor || !ClassicEditor)
    return <p>Loading editor...</p>;

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={onChange}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "insertTable",
            "imageUpload",
            "codeBlock",
            "undo",
            "redo",
          ],
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
        }}
      />
    </div>
  );
}
