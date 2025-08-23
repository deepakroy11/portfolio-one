import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "600px",
      }}
    >
      <h1
        style={{
          color: "#333",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        New Contact Message
      </h1>
      <p>
        <strong>From:</strong> {name} ({email})
      </p>
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
      </div>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        This email was sent from your portfolio contact form.
      </p>
    </div>
  );
}
