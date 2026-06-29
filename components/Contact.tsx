"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { useState } from "react";
import AnimatedContent from "../app/about-me/AnimatedContent";
import { getContactData } from "../data/contact";
import type { Locale } from "../i18n/routing";
import { config } from "../lib/config";
import Button from "./ui/Button";
import { Toast } from "./ui/Toast";

type RequiredField = "name" | "company" | "email" | "message";

export default function Contact() {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact");
  const contactData = getContactData(locale);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<RequiredField, string>>>({});

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

  const handleInvalid = (
    event: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    const field = event.currentTarget.name as RequiredField;
    const message =
      event.currentTarget.validity.typeMismatch ? t("invalidEmail") : t("required");
    setFieldErrors((current) => ({ ...current, [field]: message }));
  };

  const clearFieldError = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.currentTarget.name as RequiredField;
    if (!fieldErrors[field]) return;
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
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
                >
                  <div className="method-icon-wrap">
                    <Mail aria-hidden="true" size={24} strokeWidth={1.5} />
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
                    type="button"
                    onClick={handleCopyEmail}
                  >
                    {copied ? t("copied") : t("copy")}
                  </button>
                </div>

                {/* Phone Method */}
                <div
                  className="contact-method-item phone-card"
                >
                  <div className="method-icon-wrap phone">
                    <Phone aria-hidden="true" size={24} strokeWidth={1.5} />
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
                    type="button"
                    onClick={handleCopyPhone}
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
                    <Image src="/social/linkedin-gray-v2.png" alt="" width={24} height={24} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">LinkedIn</span>
                    <span className="method-value">
                      {contactData.socials.linkedin.label}
                    </span>
                  </div>
                  <div className="arrow-icon">
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
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
                    <Image src="/social/github-gray-v2.png" alt="" width={24} height={24} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">GitHub</span>
                    <span className="method-value">
                      {contactData.socials.github.label}
                    </span>
                  </div>
                  <div className="arrow-icon">
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
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
                <div className={`form-field ${fieldErrors.name ? "input--error" : ""}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    onInvalid={handleInvalid}
                    onInput={clearFieldError}
                  />
                  <label htmlFor="name">{t("name")}</label>
                  {fieldErrors.name ? <p id="name-error" className="form-error">{fieldErrors.name}</p> : null}
                </div>

                <div className={`form-field ${fieldErrors.company ? "input--error" : ""}`}>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder=" "
                    required
                    aria-invalid={Boolean(fieldErrors.company)}
                    aria-describedby={fieldErrors.company ? "company-error" : undefined}
                    onInvalid={handleInvalid}
                    onInput={clearFieldError}
                  />
                  <label htmlFor="company">{t("company")}</label>
                  {fieldErrors.company ? <p id="company-error" className="form-error">{fieldErrors.company}</p> : null}
                </div>

                <div className="form-row">
                  <div className={`form-field ${fieldErrors.email ? "input--error" : ""}`}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder=" "
                      required
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      onInvalid={handleInvalid}
                      onInput={clearFieldError}
                    />
                    <label htmlFor="email">{t("email")}</label>
                    {fieldErrors.email ? <p id="email-error" className="form-error">{fieldErrors.email}</p> : null}
                  </div>

                  <div className="form-field">
                    <input type="tel" id="phone" name="phone" placeholder=" " />
                    <label htmlFor="phone">{t("phone")}</label>
                  </div>
                </div>

                <div className={`form-field is-textarea ${fieldErrors.message ? "input--error" : ""}`}>
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    required
                    rows={4}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    onInvalid={handleInvalid}
                    onInput={clearFieldError}
                  />
                  <label htmlFor="message">{t("message")}</label>
                  {fieldErrors.message ? <p id="message-error" className="form-error">{fieldErrors.message}</p> : null}
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  loading={status === "loading"}
                  loadingLabel={t("sending")}
                  className={`submit-btn btn-status-${status}`}
                  size="lg"
                >
                  {status === "success" && (
                    <span className="btn-content">
                      <Check aria-hidden="true" size={18} strokeWidth={2} />
                      {t("success")}
                    </span>
                  )}
                  {status === "idle" && t("submit")}
                  {status === "error" && t("submit")}
                </Button>
              </form>
            </div>
          </AnimatedContent>
        </div>
      </div>
      {status === "success" ? (
        <Toast message={t("success")} tone="success" onClose={() => setStatus("idle")} />
      ) : null}
      {status === "error" ? (
        <Toast message={t("error")} tone="error" onClose={() => setStatus("idle")} />
      ) : null}
    </section>
  );
}
