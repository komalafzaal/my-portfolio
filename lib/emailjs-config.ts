"use client"

import emailjs from "@emailjs/browser"

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key",
}

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
}

// Send email function
export const sendEmailJS = async (formData: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "komalafzaal24@gmail.com",
      reply_to: formData.email,
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY,
    )

    return {
      success: true,
      message: `Thank you ${formData.firstName}! Your message has been sent successfully. I'll get back to you within 24 hours.`,
      data: response,
    }
  } catch (error) {
    console.error("EmailJS error:", error)
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
      error,
    }
  }
}
