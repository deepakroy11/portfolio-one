"use client";

import {
  Button,
  Form,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
  Alert,
  Image,
} from "@heroui/react";

import { FormEvent, useRef, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import CKEditorComponent from "@/components/Editor/CKEditor";

interface TaxonomyMeta {
  id: string;
  name: string;
  slug: string;
  taxonomyId: string;
}

interface PostPageClientProps {
  categories: TaxonomyMeta[];
  tags: TaxonomyMeta[];
}

const PostPageClient = ({ categories, tags }: PostPageClientProps) => {
  const [postSaving, setPostSaving] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [editorData, setEditorData] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = (content: string) => {
    setEditorData(content);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPostSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("summary", summary);
    formData.append("content", editorData);
    formData.append("categoryId", Array.from(selectedCategory)[0] || "");
    formData.append("tagsId", Array.from(selectedTags).join(","));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      setSuccess(result.message || "Post saved successfully.");
      setTimeout(() => setSuccess(null), 3000);
      setPostSaving(false);

      //Reset form
      setTitle("");
      setSlug("");
      setSummary("");
      setEditorData("");
      setSelectedTags(new Set());
      setSelectedCategory(new Set());
      setImagePreview("");
      setImageFile(null);
    } else {
      setError(result.error || "Something went wrong...");
      setTimeout(() => setError(null), 3000);
      setPostSaving(false);
    }
  };

  return (
    <main className="flex-1 p-4 space-y-6">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold">Add Post</h1>
        <Button color="default" as={Link} href="/admin/posts" size="sm">
          Back
        </Button>
      </div>

      <section className="w-full">
        <Form
          ref={formRef}
          className="w-full flex flex-col space-y-4 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-row gap-2">
            <div className="basis-1/2">
              <Input
                isRequired
                errorMessage="Please enter a valid title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter your title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="basis-1/2">
              <Input
                isRequired
                errorMessage="Please enter a valid slug"
                label="Slug"
                labelPlacement="outside"
                name="slug"
                placeholder="Enter your slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full flex justify-start items-center bg-primary-100 p-2 rounded-2xl space-x-6 space-y-2">
            <Button
              type="button"
              onPress={handleClick}
              className="px-4 py-2 bg-primary"
              color="default"
            >
              Choose File
            </Button>
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-64 h-auto rounded-2xl shadow"
                width={300}
              />
            )}
            <Input
              type="file"
              name="image"
              id="image-file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChang}
              accept="image/*"
            />
          </div>

          <div className="w-full">
            <Textarea
              isRequired
              errorMessage="Please enter a valid summary"
              label="Summary"
              labelPlacement="outside"
              name="summary"
              placeholder="Enter post summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          
          <div className="w-full">
            <h1 className="text-small mb-2">Content</h1>
            <div className="w-full min-h-[500px]">
              <CKEditorComponent
                content={""}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          <div className="w-full flex flex-row gap-2">
            <Select
              name="category"
              className="w-full"
              label="Category"
              labelPlacement="outside"
              selectionMode="single"
              selectedKeys={selectedCategory}
              isRequired
              onSelectionChange={(keys) =>
                setSelectedCategory(new Set(keys as string))
              }
            >
              {(categories ?? []).map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>
            <Select
              name="tags"
              className="w-full"
              labelPlacement="outside"
              label="Tags"
              placeholder="Select tags"
              selectionMode="multiple"
              selectedKeys={selectedTags}
              isRequired
              onSelectionChange={(keys) =>
                setSelectedTags(new Set(keys as string))
              }
            >
              {(tags ?? []).map((tag) => (
                <SelectItem key={tag.id}>{tag.name}</SelectItem>
              ))}
            </Select>
          </div>

          {success && <Alert color="success" title={success} />}
          {error && <Alert color="danger" title={error} />}

          <div className="w-full flex justify-end gap-2">
            <Button
              color="primary"
              type="submit"
              className="w-full"
              disabled={postSaving}
              isLoading={postSaving}
            >
              {postSaving ? "Saving..." : "Save"}
            </Button>

            <Button
              color="default"
              as={Link}
              className="w-full"
              href="/admin/posts"
              startContent={<BsArrowLeftShort />}
            >
              Back to All Posts
            </Button>
          </div>
          {/* {formState?.error && <Alert color="danger" title={formState.error} />} */}
        </Form>
      </section>
    </main>
  );
};

export default PostPageClient;
