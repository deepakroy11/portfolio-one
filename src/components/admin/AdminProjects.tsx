"use client";

import { useState } from "react";
import { Button, Input, Textarea, Card, CardBody, CardHeader, Select, SelectItem, Image } from "@heroui/react";
import type { Project, Skill } from "@prisma/client";

type ProjectWithSkills = Project & {
  skills?: Skill[];
};

interface AdminProjectsProps {
  projects: ProjectWithSkills[];
}

export default function AdminProjects({ projects }: AdminProjectsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithSkills | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    link: "",
    image: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("project-title", formData.title);
    form.append("project-summary", formData.summary);
    form.append("project-link", formData.link);
    if (formData.image) form.append("projectImage", formData.image);
    
    const url = editingProject ? "/api/settings/project" : "/api/settings/project";
    const method = editingProject ? "PUT" : "POST";
    
    if (editingProject) form.append("id", editingProject.id);
    
    try {
      const response = await fetch(url, { method, body: form });
      if (response.ok) {
        setShowForm(false);
        setEditingProject(null);
        setFormData({ title: "", summary: "", link: "", image: null });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (project: ProjectWithSkills) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      summary: project.summary,
      link: project.link,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/settings/project?id=${id}`, { method: "DELETE" });
        if (response.ok) window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <Button color="primary" onPress={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Project"}
        </Button>
      </div>
      
      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">{editingProject ? "Edit Project" : "Add New Project"}</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <Textarea
                label="Project Summary"
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                required
              />
              <Input
                label="Project Link"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                required
              />
              <Input
                type="file"
                label="Project Image"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
              />
              <div className="flex gap-2">
                <Button type="submit" color="primary">Save Project</Button>
                <Button type="button" variant="bordered" onPress={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
      
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardBody>
              <div className="flex gap-4">
                {project.image && (
                  <Image src={project.image} alt={project.title} className="w-20 h-20 object-cover" />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.summary}</p>
                  <p className="text-sm text-blue-600">{project.link}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered" onPress={() => handleEdit(project)}>Edit</Button>
                  <Button size="sm" color="danger" variant="bordered" onPress={() => handleDelete(project.id)}>Delete</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}