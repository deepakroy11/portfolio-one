"use client";

import { Button, Input, Textarea } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

type BasicDetails = {
  id: string;
  siteName: string;
  tagLine: string;
  aboutMe: string;
  aboutMeImage: string;
  profileImage: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
};

export default function Contact({
  basicDetails,
}: {
  basicDetails?: BasicDetails;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the email using the API route
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };
  return (
    <section id="contact" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Contact Me</h2>
      <form
        className="w-full justify-center items-center space-y-4 m-auto max-w-2xl"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="name"
          label="Your Name"
          placeholder="Enter your name"
          size="lg"
          isRequired
          value={name}
          onChange={(e) => setName(e.target.value)}
          errorMessage="Name is required"
        />
        <Input
          type="email"
          name="email"
          label="Your Email"
          placeholder="Enter your Email"
          size="lg"
          isRequired
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage="Email is required"
        />
        <Textarea
          name="message"
          label="Message"
          placeholder="Your Message"
          size="lg"
          isRequired
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            Thank you! Your message has been sent.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            Failed to send message. Please try again.
          </div>
        )}
        <Button 
          type="submit" 
          color="primary" 
          size="lg" 
          className="w-full"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <div className="mt-8 text-center">
        Or reach out via{" "}
        <Link
          href={`mailto:${basicDetails?.contactEmail || "deepakroy11@gmail.com"}`}
        >
          email
        </Link>
      </div>
    </section>
  );
}
