"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@heroui/react";
import type { Skill } from "@prisma/client";

interface AdminSkillsProps {
  skills: Skill[];
}

export default function AdminSkills({ skills }: AdminSkillsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("skill-title", formData.title);
    form.append("skill-summary", formData.summary);
    if (formData.image) form.append("skillImage", formData.image);

    const url = "/api/settings/skill";
    const method = editingSkill ? "PUT" : "POST";

    if (editingSkill) form.append("id", editingSkill.id);

    try {
      const response = await fetch(url, { method, body: form });
      if (response.ok) {
        setShowForm(false);
        setEditingSkill(null);
        setFormData({ title: "", summary: "", image: null });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      title: skill.title,
      summary: skill.summary,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        const response = await fetch(`/api/settings/skill?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Skills</h2>
        <Button color="primary" onPress={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Skill"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Skill Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <Textarea
                label="Skill Summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                required
              />
              <Input
                type="file"
                label="Skill Image/Icon"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
              <div className="flex gap-2">
                <Button type="submit" color="primary">
                  Save Skill
                </Button>
                <Button
                  type="button"
                  variant="bordered"
                  onPress={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      <div className="grid gap-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardBody>
              <div className="flex gap-4">
                <Image
                  src={
                    skill.image
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${skill.image}`
                      : "/placeholder-skill.png"
                  }
                  alt={skill.title}
                  className="w-16 h-16 object-center rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{skill.title}</h3>
                  <p className="text-sm text-gray-600">{skill.summary}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => handleEdit(skill)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onPress={() => handleDelete(skill.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
