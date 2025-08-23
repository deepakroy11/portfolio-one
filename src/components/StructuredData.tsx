export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Deepak Roy",
    "jobTitle": "Full-Stack Web Developer",
    "description": "Full-stack web developer specializing in Next.js, React, and modern web solutions",
    "url": "https://deepakroy.dev",
    "sameAs": [
      "https://github.com/deepakroy",
      "https://linkedin.com/in/deepakroy"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Full-Stack Development"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}