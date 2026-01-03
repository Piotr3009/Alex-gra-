'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'How does onboarding work?',
    answer: 'Our optional onboarding package includes a 2-hour online training session for up to 2 people from your team. We cover system setup, workflow configuration, and best practices for production scheduling. You can get started on your own with our documentation, but most teams find the guided onboarding accelerates their adoption significantly.',
  },
  {
    question: 'Can we add more users later?',
    answer: 'Yes, you can upgrade your plan at any time to add more users. When you upgrade mid-cycle, we pro-rate the difference. If you need more users than the Pro plan offers, our Enterprise plan provides unlimited seats with custom pricing based on your specific needs.',
  },
  {
    question: 'How is our data secured and who can access it?',
    answer: 'Your data is encrypted at rest and in transit using industry-standard encryption. We use secure cloud infrastructure with regular backups. Only your team members can access your data — we never share it with third parties. You control user permissions and can restrict access to specific features or projects within your organisation.',
  },
  {
    question: 'Do you support files and drawings?',
    answer: 'Yes, you can attach files including technical drawings, PDFs, images, and CAD files to projects and orders. Storage limits vary by plan (5GB for Starter, 25GB for Growth, 100GB for Pro). Files are versioned so you can track changes and revert if needed.',
  },
  {
    question: "What's included in support?",
    answer: 'All plans include email support with response within 1 business day. Growth plans get priority support with faster response times. Pro and Enterprise customers receive dedicated support with direct access to our team via phone or video call. We also maintain comprehensive documentation and video tutorials.',
  },
  {
    question: 'Can you build custom integrations?',
    answer: 'Pro plans include API access for building your own integrations. For Enterprise customers, we offer custom integration development for accounting systems, CRMs, or other business tools. Contact our sales team to discuss your specific integration requirements and timeline.',
  },
]

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400 leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
