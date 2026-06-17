"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import AnimatedContent from "../app/about-me/AnimatedContent";
import { getContactData } from "../data/contact";
import type { Locale } from "../i18n/routing";
import { config } from "../lib/config";

export default function Contact() {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact");
  const contactData = getContactData(locale);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        `https://formspree.io/f/${config.formspreeId}`,
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        setStatus("success");
        sendGAEvent("event", "contact_form_submit", { locale });
        form.reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="contact-page-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-hero-image" aria-hidden="true">
        <Image
          src={contactData.heroImage}
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className="contact-panel-band">
        <div className="contact-split-container">
          {/* Left Column: Info Card */}
          <AnimatedContent
            delay={0.1}
            distance={80}
            duration={0.8}
            ease="power3.out"
            threshold={0.05}
            className="contact-info-wrap"
          >
            <div className="contact-info-card">
              <div className="contact-info-header">
                <h2 id="contact-title">{contactData.title}</h2>
                <p className="contact-subtitle">
                  {contactData.subtitle}
                </p>
              </div>

              <div className="contact-methods">
                {/* Email Method */}
                <div
                  className="contact-method-item email-card"
                  onClick={handleCopyEmail}
                >
                  <div className="method-icon-wrap">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="method-details">
                    <span className="method-label">{t("email")}</span>
                    <span className="method-value">
                      {contactData.email}
                    </span>
                  </div>
                  <button
                    className={`copy-btn ${copied ? "copied" : ""}`}
                    aria-label={t("copyEmail")}
                  >
                    {copied ? t("copied") : t("copy")}
                  </button>
                </div>

                {/* Phone Method */}
                <div
                  className="contact-method-item phone-card"
                  onClick={handleCopyPhone}
                >
                  <div className="method-icon-wrap phone">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="method-details">
                    <span className="method-label">{t("phone")}</span>
                    <span className="method-value">
                      {contactData.phone}
                    </span>
                  </div>
                  <button
                    className={`copy-btn ${copiedPhone ? "copied" : ""}`}
                    aria-label={t("copyPhone")}
                  >
                    {copiedPhone ? t("copied") : t("copy")}
                  </button>
                </div>

                {/* Social Card: LinkedIn */}
                <a
                  href={contactData.socials.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method-item social-card"
                >
                  <div className="method-icon-wrap linkedin">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="method-details">
                    <span className="method-label">LinkedIn</span>
                    <span className="method-value">
                      {contactData.socials.linkedin.label}
                    </span>
                  </div>
                  <div className="arrow-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>

                {/* Social Card: GitHub */}
                <a
                  href={contactData.socials.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method-item social-card"
                >
                  <div className="method-icon-wrap github">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div className="method-details">
                    <span className="method-label">GitHub</span>
                    <span className="method-value">
                      {contactData.socials.github.label}
                    </span>
                  </div>
                  <div className="arrow-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedContent>

          {/* Right Column: Form Card */}
          <AnimatedContent
            delay={0.22}
            distance={80}
            duration={0.8}
            ease="power3.out"
            threshold={0.05}
            className="contact-form-wrap"
          >
            <div className="contact-card">
              <div className="contact-card-header">
                <h3>{t("formTitle")}</h3>
                <p>{t("formSubtitle")}</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name">{t("name")}</label>
                </div>

                <div className="form-field">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="company">{t("company")}</label>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder=" "
                      required
                    />
                    <label htmlFor="email">{t("email")}</label>
                  </div>

                  <div className="form-field">
                    <input type="tel" id="phone" name="phone" placeholder=" " />
                    <label htmlFor="phone">{t("phone")}</label>
                  </div>
                </div>

                <div className="form-field is-textarea">
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    required
                    rows={4}
                  />
                  <label htmlFor="message">{t("message")}</label>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`submit-btn btn-status-${status}`}
                >
                  {status === "idle" && t("submit")}
                  {status === "loading" && (
                    <span className="btn-content">
                      <svg
                        className="spinner-icon animate-spin"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        />
                      </svg>
                      {t("sending")}
                    </span>
                  )}
                  {status === "success" && (
                    <span className="btn-content">
                      <svg
                        className="success-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline
                          points="20 6 9 17 4 12"
                          className="checkmark-path"
                        />
                      </svg>
                      {t("success")}
                    </span>
                  )}
                  {status === "error" && t("error")}
                </button>
              </form>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
