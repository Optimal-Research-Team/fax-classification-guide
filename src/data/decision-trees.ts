import { DecisionNode } from "./types";

export const mainDecisionTree: DecisionNode[] = [
  {
    id: "start",
    question: "What type of document did you receive?",
    options: [
      { label: "Blank / garbled / advertisement", nextId: "result-junk" },
      { label: "Contains clinical or medical content", nextId: "clinical" },
      { label: "Administrative / non-clinical content", nextId: "admin" },
    ],
  },
  {
    id: "clinical",
    question: "What is the primary content of the document?",
    options: [
      { label: "Lab results / test results (non-imaging)", nextId: "lab-or-path" },
      { label: "Imaging or radiology report", nextId: "imaging-check" },
      { label: "Specialist letter or clinical notes", nextId: "consult-or-referral" },
      { label: "Prescription or pharmacy request", nextId: "result-prescription" },
    ],
  },
  {
    id: "lab-or-path",
    question: "Does the report involve a tissue sample or biopsy?",
    options: [
      { label: "Yes - tissue biopsy / histology / Pap smear", nextId: "result-pathology" },
      { label: "No - bloodwork, ECG, Holter, ABPM, swabs, PFT", nextId: "result-lab" },
    ],
  },
  {
    id: "imaging-check",
    question: "Who signed/interpreted the report?",
    options: [
      { label: "Radiologist or nuclear medicine physician", nextId: "result-radiology" },
      { label: "Cardiologist, ophthalmologist, or other specialist", nextId: "result-imaging" },
      { label: "Cannot determine the signing provider", nextId: "result-radiology" },
    ],
  },
  {
    id: "consult-or-referral",
    question: "Does the document contain clinical findings/notes, or is it about scheduling/referral workflow?",
    options: [
      { label: "Clinical notes, findings, diagnosis, recommendations", nextId: "result-consult" },
      { label: "Appointment notification, booking, declined referral, unable to reach", nextId: "result-referral" },
      { label: "Patient photo (usually dermatology)", nextId: "result-photo" },
    ],
  },
  {
    id: "admin",
    question: "What kind of administrative document is this?",
    options: [
      { label: "Insurance form, prior auth, Trillium, disability", nextId: "result-insurance" },
      { label: "Legal correspondence (subpoena, CPSO, lawyer)", nextId: "result-legal" },
      { label: "Old chart / historical records transfer", nextId: "result-oldchart" },
      { label: "Consent form, questionnaire, fee schedule, other", nextId: "result-others" },
    ],
  },
  // Result nodes
  { id: "result-junk", question: "Junk", options: [] },
  { id: "result-lab", question: "Lab", options: [] },
  { id: "result-pathology", question: "Pathology", options: [] },
  { id: "result-radiology", question: "Radiology", options: [] },
  { id: "result-imaging", question: "Imaging", options: [] },
  { id: "result-consult", question: "Consult", options: [] },
  { id: "result-referral", question: "Referral", options: [] },
  { id: "result-prescription", question: "Prescription", options: [] },
  { id: "result-insurance", question: "Insurance", options: [] },
  { id: "result-legal", question: "Legal", options: [] },
  { id: "result-oldchart", question: "Old Chart", options: [] },
  { id: "result-photo", question: "Photo", options: [] },
  { id: "result-others", question: "Others", options: [] },
];

export const disambiguationFlows = [
  {
    id: "radiology-vs-imaging",
    title: "Radiology vs. Imaging",
    subtitle: "The deciding factor is the signing provider's specialty, not the procedure name",
    steps: [
      "Look at who signed/interpreted the report",
      "Radiologist or nuclear medicine physician → Radiology",
      "Cardiologist, ophthalmologist, or other specialist → Imaging",
      "Cannot determine? Default to Radiology",
    ],
  },
  {
    id: "referral-vs-consult",
    title: "Referral vs. Consult",
    subtitle: "Scheduling workflow vs. clinical content",
    steps: [
      "Does the document contain clinical notes, findings, or recommendations?",
      "Yes → Consult (even if it says 'referral' in the header)",
      "No, only appointment scheduling, confirmations, or status updates → Referral",
      "Rejected referral with cover letter → Referral (rejection is the primary content)",
    ],
  },
  {
    id: "ecg-abpm-holter",
    title: "ECG / ABPM / Holter",
    subtitle: "These are NOT imaging — always Lab",
    steps: [
      "ECG reports from cardiology clinics (e.g., PACE) → Lab",
      "Ambulatory BP monitor (ABPM) reports → Lab",
      "Holter rhythm-monitoring outputs → Lab",
      "Only exception: radiologist-signed diagnostic imaging report → Radiology",
    ],
  },
  {
    id: "prescription-vs-insurance",
    title: "Prescription vs. Insurance",
    subtitle: "LU codes go on the prescription; standalone forms go to a payer",
    steps: [
      "Does the form put a code directly on a prescription to enable dispensing? → Prescription (LU code)",
      "Is the physician completing a standalone form for a payer to adjudicate? → Insurance",
      "Trillium Drug Program SA forms → Insurance (payer adjudication)",
      "Pharmacy renewal/clarification requests → Prescription",
    ],
  },
  {
    id: "legal-vs-others",
    title: "Legal vs. Others",
    subtitle: "Active legal counterparty vs. routine legal documents",
    steps: [
      "Is an external party with legal standing initiating contact?",
      "Yes (subpoena, court order, lawyer request, CPSO) → Legal",
      "No (consent forms, policy acknowledgments, PHIPA notices) → Others",
      "Key question: does this require a physician response to a legal entity?",
    ],
  },
  {
    id: "oldchart-vs-others",
    title: "Old Chart vs. Others",
    subtitle: "Records transfer intent is the key",
    steps: [
      "Does the document indicate records transfer or chart copy?",
      "Yes, or includes actual historical records → Old Chart",
      "Standalone consent form with no records attached → Others",
      "MyChart/portal conversation logs or exported communications → Old Chart",
    ],
  },
];
