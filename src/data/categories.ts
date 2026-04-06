import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "referral",
    name: "Referral",
    shortDescription: "Specialist appointment communications & scheduling workflows",
    definition:
      "Communications from specialist clinics regarding specialist appointments for a patient that you have previously referred to them. This includes appointment confirmations/notifications, unable-to-reach notices, requests for more information, declined referrals, and referral/intake forms being sent to or from a specialist clinic.",
    belongsHere: [
      "Appointment confirmations/notifications from specialist clinics",
      "Notices that the specialist couldn't reach the patient",
      "Requests for more information to complete a referral",
      "Declined or returned referrals",
      "Referral/intake forms sent to or from specialist clinics",
      "Referral rejection cover letters (even with appended original referral)",
    ],
    doesNotBelong: [
      "Consultation notes or follow-up notes from specialists (those are Consult)",
      "Documents with demographics/DOB/HCN but no referral workflow",
      "Generic fax headers mentioning 'referral' without actual referral content",
      "Imaging centre appointment notifications (those are Radiology)",
      "Returned requisitions — categorize by the service type instead",
    ],
    priority: {
      abnormalCriteria: [
        "Referral contains urgent clinical concerns or time-sensitive language",
        "Serious suspected diagnoses requiring prompt review",
        "Incomplete referral missing necessary supporting documents",
        "Patient no-showed or did not attend appointment",
        "Appointment could not be booked (including declined referrals)",
        "Patient cancelled the appointment",
        "Patient could not be reached by the specialist office",
      ],
      normalCriteria: [
        "Straightforward routine referral with no urgency signals",
        "Routine appointment confirmation or scheduling notification",
        "No negative status indicated",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Date referral was made", note: "Not the appointment date" },
      {
        priority: 2,
        dateField: "Date of response letter",
        note: "When specialist office sends back acknowledgment/wait time/request for info — use this date, not the original referral date",
      },
    ],
    edgeCases: [
      {
        scenario: "Specialist sends a cover letter rejecting a referral with the original referral form appended",
        correctCategory: "referral",
        explanation:
          "The cover letter is the primary content. Description should reflect the rejection (e.g., 'Cardiology - Referral rejection from [clinic]'). Extract date from the cover letter.",
      },
      {
        scenario: "Imaging centre faxes back a requisition with appointment details added",
        correctCategory: "radiology",
        explanation:
          "Even though it looks like an appointment notification, the service is imaging. Classify as Radiology, not Referral.",
      },
    ],
    color: "#3b82f6",
  },
  {
    slug: "consult",
    name: "Consult",
    shortDescription: "Specialist consultation reports & clinical notes",
    definition:
      "Consultation reports for both initial consultations and follow-up visits from a specialist or allied health practitioner (cardiologist, urologist, dermatologist, endocrinologist, OB-GYN, psychotherapist, etc.). These documents contain clinical information. Also includes procedure notes, discharge summaries, oncology reports, and surgery reports from specialists.",
    belongsHere: [
      "Initial consultation reports from specialists",
      "Follow-up visit notes from specialists",
      "Procedure notes (format as 'Procedure note - [specialty]')",
      "Discharge summaries from specialists",
      "Oncology reports",
      "Surgery reports",
      "Psychotherapist clinical notes",
    ],
    doesNotBelong: [
      "Appointment scheduling communications (those are Referral)",
      "Documents with only scheduling info and no clinical content",
      "Standalone questionnaires not attached to a consult note (those are Others)",
    ],
    priority: {
      abnormalCriteria: [
        "New diagnosis identified (especially cancer, autoimmune, cardiac, neurological)",
        "Urgent follow-up, expedited testing, or emergency intervention recommended",
        "Surgery or procedure recommended",
        "High-risk medication change (anticoagulants, immunosuppressants, chemo, opioids)",
        "Specialist asks physician to take specific action",
        "Abnormal imaging/biopsy results included",
        "Concerning language: 'worrisome', 'suspicious', 'malignant', 'cannot rule out'",
        "Patient seen in ER or admitted to hospital",
        "Patient discharged back with new management plan",
      ],
      normalCriteria: [
        "Reassuring findings, no new diagnosis",
        "'No significant abnormalities' noted",
        "Routine follow-up planned with no physician action required",
        "Stable chronic condition being monitored",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Visit/appointment date", note: "The date the patient was seen" },
      { priority: 2, dateField: "Dictation date", note: "Administrative artifact, not the clinical event" },
      { priority: 3, dateField: "Transcription date", note: "Last resort — farthest from the clinical event" },
    ],
    edgeCases: [],
    color: "#8b5cf6",
  },
  {
    slug: "imaging",
    name: "Imaging",
    shortDescription: "Reports interpreted by non-radiologist specialists",
    definition:
      "Reports from imaging or functional tests interpreted by a non-radiologist specialist — most commonly a cardiologist, ophthalmologist, or vascular surgeon. The report typically appears on letterhead of a specialty clinic (not a radiology department) and is signed by a specialist in that field.",
    belongsHere: [
      "Echocardiogram (TTE/TEE) interpreted by cardiologist",
      "Stress echocardiogram",
      "Nuclear cardiac stress test (MIBI) interpreted by cardiologist",
      "Cardiac MRI interpreted by cardiologist",
      "Retinal/fundus imaging interpreted by ophthalmologist",
    ],
    doesNotBelong: [
      "Reports signed by a radiologist (those are Radiology)",
      "ECG reports (those are Lab)",
      "ABPM reports (those are Lab)",
      "Holter monitor reports (those are Lab)",
    ],
    priority: {
      abnormalCriteria: [
        "Acute ischemia or infarction",
        "Significant arrhythmia",
        "Markedly reduced cardiac function",
        "Severe valve disease",
        "Device concerns",
        "Prompt follow-up recommended",
        "Impression contains 'abnormal', 'suspicious', 'concerning'",
        "Any mass, nodule, or lesion",
        "Recommendation for additional imaging or biopsy",
      ],
      normalCriteria: [
        "Impression states 'normal', 'unremarkable', 'no acute findings'",
        "Only age-appropriate changes",
        "Stable findings with no new concerns",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Scan/procedure date", note: "The date the test was performed" },
      { priority: 2, dateField: "Report date", note: "Often the day after the scan" },
    ],
    edgeCases: [
      {
        scenario: "Cardiac MRI — is it Imaging or Radiology?",
        correctCategory: "imaging",
        explanation:
          "Check who signed it. If signed by a cardiologist → Imaging. If signed by a radiologist → Radiology. The signing provider's specialty is the deciding factor, not the procedure name.",
      },
    ],
    color: "#06b6d4",
  },
  {
    slug: "radiology",
    name: "Radiology",
    shortDescription: "Reports interpreted by radiologists or nuclear medicine physicians",
    definition:
      "Reports from imaging tests interpreted by a radiologist or nuclear medicine physician. Typically on letterhead from a radiology department, imaging centre, or hospital radiology service, signed by an MD with radiology credentials (e.g., FRCPC Diagnostic Radiology).",
    belongsHere: [
      "X-ray, CT scan, MRI reports",
      "Diagnostic ultrasound (abdominal, pelvic, renal, thyroid, carotid, DVT)",
      "Mammography",
      "Fluoroscopy, DEXA/bone density",
      "PET scan, nuclear medicine scans",
      "Any document from an imaging/DI centre (reports, appointment notifications, requisition returns, cover letters)",
      "Returned/annotated imaging requisitions (e.g., 'patient no-show')",
    ],
    doesNotBelong: [
      "Reports signed by non-radiologist specialists (those are Imaging)",
      "ECG, ABPM, or Holter reports (those are Lab)",
    ],
    priority: {
      abnormalCriteria: [
        "Impression contains 'abnormal', 'suspicious', 'malignant', 'concerning', 'cannot exclude'",
        "'Further investigation recommended' or 'clinical correlation recommended'",
        "Any mass, nodule, lesion, or tumor (even 'likely benign')",
        "Fracture (new or previously undocumented)",
        "Pneumonia, effusion, edema, obstruction, aneurysm, dissection, embolism, infarction, hemorrhage, abscess, perforation",
        "Incidental findings needing follow-up (adrenal nodule, thyroid nodule, renal cyst >3cm, lung nodule)",
        "BI-RADS >= 3",
        "Osteoporosis (T-score <= -2.5) or significant osteopenia with fracture risk",
        "Recommendation for additional imaging or biopsy",
        "Progression or new findings vs. prior imaging",
      ],
      normalCriteria: [
        "Impression states 'normal', 'unremarkable', 'no acute findings', 'negative'",
        "Only age-appropriate degenerative changes",
        "Stable findings with no new concerns",
        "Expected post-surgical appearance",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Scan/procedure date", note: "The date the imaging was performed" },
      { priority: 2, dateField: "Report date", note: "Radiologists commonly report the day after the scan" },
      {
        priority: 3,
        dateField: "Notification letter date",
        note: "For appointment notifications — use letter date, not future appointment date",
      },
    ],
    edgeCases: [
      {
        scenario: "Fax from imaging centre with 'Confidential Report' header",
        correctCategory: "radiology",
        explanation: "Documents from imaging/DI centres default to Radiology. Do NOT use Referral for imaging attachments.",
      },
      {
        scenario: "Mammography requisition returned with 'patient no-show' annotation",
        correctCategory: "radiology",
        explanation:
          "Returned requisitions go to the category of the SERVICE, not Referral. This is a mammography service → Radiology.",
      },
    ],
    color: "#0ea5e9",
  },
  {
    slug: "lab",
    name: "Lab",
    shortDescription: "Lab test results, ECG, Holter, PFT, and non-imaging tests",
    definition:
      "Lab test results from any test that is not imaging-related and doesn't require tissue biopsy. Includes bloodwork, urinalysis, swabs, ECG, Holter, PFT, urea breath test, ABPM, and similar non-imaging diagnostic tests.",
    belongsHere: [
      "Bloodwork and urinalysis results",
      "Swab and culture results",
      "ECG reports (including from cardiology clinics like PACE)",
      "Holter monitor reports",
      "Ambulatory BP monitor (ABPM) reports",
      "Pulmonary function tests (PFT)",
      "Urea breath test results",
    ],
    doesNotBelong: [
      "Pathology/biopsy results (those are Pathology)",
      "Imaging reports of any kind",
    ],
    priority: {
      abnormalCriteria: [
        "Any value flagged H/L/HH/LL/A/C by the lab",
        "Values outside reference range even if not flagged",
        "Critical values (see critical values table below)",
        "Positive cultures with pathogenic organisms",
        "Positive STI, hepatitis, HIV screens",
        "Cancer markers significantly above normal",
        "eGFR <60 (especially if new or declining)",
        "HbA1c >7.0% (or >6.5% if not previously diabetic)",
        "TSH significantly outside range",
        "Liver enzymes (ALT, AST, ALP, GGT) >2x upper limit of normal",
        "Any lab comment recommending follow-up",
      ],
      normalCriteria: [
        "All values within reference ranges, no flags",
        "Minor clinically insignificant deviations",
        "Stable routine monitoring results",
      ],
      criticalValues: [
        { analyte: "Potassium", threshold: ">6.0 or <3.0 mmol/L", direction: "above" },
        { analyte: "Sodium", threshold: "<120 or >160 mmol/L", direction: "below" },
        { analyte: "Glucose", threshold: "<3.0 mmol/L", direction: "below" },
        { analyte: "Hemoglobin", threshold: "<70 g/L", direction: "below" },
        { analyte: "INR", threshold: ">5.0", direction: "above" },
        { analyte: "Troponin", threshold: "Positive", direction: "above" },
        { analyte: "Platelets", threshold: "<50 or >1000 x10^9/L", direction: "below" },
        { analyte: "WBC", threshold: "<2.0 or >30 x10^9/L", direction: "below" },
        { analyte: "Creatinine", threshold: "Significantly elevated", direction: "above" },
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Collection/draw date", note: "When the sample was taken from the patient" },
      { priority: 2, dateField: "Requisition date", note: "When the test was ordered" },
      { priority: 3, dateField: "Report date", note: "NOT the processing/verification/result-release date" },
      {
        priority: 4,
        dateField: "Letter date",
        note: "Only for lab requests for more info — use the letter date, not collection date",
      },
    ],
    edgeCases: [
      {
        scenario: "ECG from a cardiology clinic (e.g., PACE cardiology)",
        correctCategory: "lab",
        explanation:
          "ECG and ABPM reports are NOT Imaging/Radiology. Always classify as Lab, even when from cardiology clinics.",
      },
      {
        scenario: "Lab requisition returned with 'cancelled' annotation",
        correctCategory: "lab",
        explanation:
          "Returned requisitions are categorized by the service type. Lab requisition → Lab.",
      },
    ],
    color: "#22c55e",
  },
  {
    slug: "pathology",
    name: "Pathology",
    shortDescription: "Tissue biopsy and histology reports",
    definition:
      "Pathology reports from tissue samples taken from the patient, including biopsy results, histology, and cytology.",
    belongsHere: [
      "Biopsy results",
      "Histology reports",
      "Pap smear results",
      "Cytology reports",
      "Surgical pathology reports",
    ],
    doesNotBelong: [
      "Bloodwork or swab results (those are Lab)",
      "Imaging reports",
    ],
    priority: {
      abnormalCriteria: [
        "Malignancy, carcinoma, sarcoma, lymphoma, melanoma",
        "Dysplasia (moderate/severe/high-grade), carcinoma in situ",
        "Atypical cells, neoplasm",
        "Pap smear: ASC-US, ASC-H, LSIL, HSIL, AGC, or any non-NILM result",
        "HPV positive (especially high-risk types 16, 18)",
        "Inflammation with atypia, unexpected findings, infection (e.g., H. pylori)",
        "Positive or close margins on excisional biopsies",
        "Recommendation for re-excision, additional sampling, or clinical correlation",
        "Immunohistochemistry suggesting aggressive disease",
      ],
      normalCriteria: [
        "Pap smear NILM with negative HPV",
        "Biopsy benign, no atypia or dysplasia",
        "Excision with clear margins",
        "'No malignancy identified' or 'benign [tissue type]'",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Collection/draw date", note: "When the specimen was obtained" },
      { priority: 2, dateField: "Requisition date", note: "When the test was ordered" },
      { priority: 3, dateField: "Report date", note: "When the pathologist issued the report" },
    ],
    edgeCases: [],
    color: "#f97316",
  },
  {
    slug: "prescription",
    name: "Prescription",
    shortDescription: "Rx renewals, pharmacy requests, and LU code forms",
    definition:
      "Prescription renewal requests, copies of prescriptions, pharmacist revision requests, and Limited Use (LU) code forms for government-subsidized prescriptions in Ontario. LU codes are part of the prescribing act itself and belong here, not under Insurance.",
    belongsHere: [
      "Prescription renewal requests from pharmacies",
      "Copies of prescriptions",
      "Pharmacist requests for revision to a previous prescription",
      "Limited Use (LU) code forms (Ontario ODB)",
      "Pharmacy prescription clarification requests",
      "Refill/renewal faxes from pharmacies (e.g., Shoppers Drug Mart)",
    ],
    doesNotBelong: [
      "Prescription authorization forms from insurers (those are Insurance)",
      "Trillium Drug Program forms (those are Insurance)",
    ],
    priority: {
      abnormalCriteria: [
        "Controlled substance renewal (opioids, benzodiazepines, stimulants, cannabis)",
        "Pharmacy flagging drug interaction, allergy, duplicate therapy, or contraindication",
        "Patient not picking up critical medication",
        "Request for medication physician may not have prescribed",
        "Patient out of critical medication (insulin, anticoagulant, antiepileptic, immunosuppressant)",
        "Pharmacy requesting prescription clarification",
        "Medication requiring monitoring (warfarin, lithium, methotrexate)",
        "Patient not seen in clinic for extended period but requesting renewals",
      ],
      normalCriteria: [
        "Routine renewal for non-controlled, non-critical maintenance medication",
        "Prescription transfer notification",
        "Confirmation of prescription being filled",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Date prescription was written", note: "Not the date faxed" },
      { priority: 2, dateField: "Date faxed", note: "Fax transmission date is not the prescription date" },
    ],
    edgeCases: [
      {
        scenario: "Pharmacy fax requesting a renewal for a patient's blood pressure medication",
        correctCategory: "prescription",
        explanation:
          "Pharmacy prescription renewal/clarification requests are Prescription, not Others.",
      },
    ],
    color: "#ec4899",
  },
  {
    slug: "insurance",
    name: "Insurance",
    shortDescription: "Insurance forms, prior authorizations, and Trillium Drug Program",
    definition:
      "Any insurance-related document including prescription payment authorization forms from insurers, medical records requests for insurance purposes, and Trillium Drug Program forms. Trillium functions as a payer making independent coverage decisions — the clinic completes documentation for adjudication, which is operationally identical to private insurance requests.",
    belongsHere: [
      "Prescription payment authorization forms from insurers",
      "Medical records requests for insurance purposes",
      "Trillium Drug Program enrollment, eligibility, and Special Authorization forms",
      "Disability forms (LTD/STD)",
      "Travel insurance medical forms",
      "WSIB documentation",
      "Life insurance medical forms",
    ],
    doesNotBelong: [
      "LU code forms (those are Prescription — code goes directly on the prescription)",
    ],
    priority: {
      abnormalCriteria: [
        "Form has a deadline (especially within 2 weeks)",
        "Request for physician to complete a medical form (disability, travel, life insurance, LTD/STD)",
        "Denial of prior authorization requiring physician appeal",
        "Request for additional medical information",
        "Independent Medical Examination (IME) request",
        "WSIB documentation required",
        "Disability Tax Credit (T2201) certificate request",
      ],
      normalCriteria: [
        "Confirmation of coverage or benefits summary",
        "Completed/processed claim with no further action",
        "General correspondence not requiring physician input",
        "Duplicate of previously received form",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Date of the letter", note: "When the insurance company wrote/sent the form" },
      { priority: 2, dateField: "Date the form was sent", note: "Secondary to letter date" },
    ],
    edgeCases: [
      {
        scenario: "Trillium Drug Program Special Authorization form",
        correctCategory: "insurance",
        explanation:
          "Even though Trillium is a government program, it functions as a payer. The physician completes a standalone form for adjudication → Insurance. Contrast with LU codes which go directly on the prescription → Prescription.",
      },
    ],
    color: "#eab308",
  },
  {
    slug: "legal",
    name: "Legal",
    shortDescription: "Subpoenas, court orders, CPSO, lawyer requests",
    definition:
      "Active medico-legal correspondence requiring physician attention or involving an external legal counterparty. The defining feature is that an external party with legal standing is initiating contact and a response or action is typically required.",
    belongsHere: [
      "Subpoenas and court orders",
      "Lawyer requests for patient records",
      "Lawsuit notices",
      "CPSO correspondence",
      "Coroner requests",
      "Privacy breach investigations (IPC)",
    ],
    doesNotBelong: [
      "New-patient consent forms (those are Others)",
      "Clinic onboarding policy acknowledgments (those are Others)",
      "PHIPA collection notices (those are Others)",
      "Routine documents that are 'legal in a technical sense' but have no active legal counterparty",
    ],
    priority: {
      abnormalCriteria: [
        "Flag ALL legal documents unless clearly junk/spam",
        "Subpoenas, court orders, medical-legal report requests",
        "Lawsuit notices, lawyer requests for patient information",
        "Coroner requests, CPSO correspondence",
        "Privacy breach notifications/investigations (IPC)",
      ],
      normalCriteria: [
        "Clearly spam or junk from a legal marketing firm",
        "General legal newsletter or advertisement",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Date of the letter", note: "The date on the legal correspondence" },
    ],
    edgeCases: [],
    color: "#ef4444",
  },
  {
    slug: "oldchart",
    name: "Old Chart",
    shortDescription: "Historical medical records & chart copies from other providers",
    definition:
      "Previous medical records, historical patient files, or chart copies from other medical providers. Often grouped together in a single document spanning multiple providers and dates. If a document is a mixture of historical records from multiple providers and dates, classify as Oldchart even if individual items would otherwise be Consult or Lab.",
    belongsHere: [
      "Chart copies or records transfers from previous providers",
      "Historical patient files",
      "Patient consent/ROI forms ONLY when paired with records transfer intent",
      "MyChart/patient portal conversation logs and exported communications",
      "Bundled historical records from multiple providers and dates",
    ],
    doesNotBelong: [
      "Standalone new-patient registration or clinic onboarding consents (those are Others)",
      "Consent forms with no records-transfer intent (those are Others)",
    ],
    priority: {
      abnormalCriteria: [
        "Active or recent serious conditions (cancer, HIV, hepatitis, significant cardiac/respiratory/neurological disease)",
        "Current medications requiring monitoring (warfarin, lithium, methotrexate, immunosuppressants, opioids, insulin)",
        "History of serious allergies (anaphylaxis, Stevens-Johnson)",
        "Recent hospitalizations or surgeries",
        "Outstanding follow-up items",
        "Active mental health safety concerns or recent psychiatric admissions",
        "Active substance use treatment",
        "Possible current pregnancy",
        "Abnormal results that appear unacted-on",
        "Pediatric immunization gaps",
      ],
      normalCriteria: [
        "Generally healthy patient with well-documented and managed issues",
        "No outstanding follow-up",
        "Records >10 years old with no ongoing relevance",
      ],
    },
    dateExtraction: [
      {
        priority: 1,
        dateField: "null (return null)",
        note: "Old charts span years — a single date is misleading. Exception: if clearly a single historical record, use the appropriate rule for that document type.",
      },
    ],
    edgeCases: [
      {
        scenario: "MyChart conversation log or exported portal communications",
        correctCategory: "oldchart",
        explanation:
          "MyChart/patient-portal exports are almost always historical record copies. Classify as Oldchart, not Others.",
      },
    ],
    color: "#78716c",
  },
  {
    slug: "photo",
    name: "Photo",
    shortDescription: "Patient photos, typically dermatology images",
    definition:
      "Photos of a patient, typically dermatology images. Rarely seen via inbound fax.",
    belongsHere: [
      "Clinical photographs of skin lesions",
      "Dermatology images",
      "Pre/post-treatment photos",
    ],
    doesNotBelong: [],
    priority: {
      abnormalCriteria: [
        "Rapidly changing lesion, bleeding, ulceration",
        "Asymmetry, irregular borders, color variation, diameter >6mm, evolving characteristics",
        "Referral/cover letter expresses concern",
        "'Rule out malignancy', 'suspicious', 'biopsy recommended'",
        "Signs of infection, burns, wounds, trauma",
        "Any note suggesting urgency",
        "Image quality too poor with little context (err on side of caution)",
      ],
      normalCriteria: [
        "Routine documentation of known benign condition",
        "Pre/post-treatment photos showing expected progress",
        "Documentation only with no clinical concern",
      ],
    },
    dateExtraction: [
      { priority: 1, dateField: "Most prominent clinically relevant date", note: "Best effort" },
    ],
    edgeCases: [],
    color: "#14b8a6",
  },
  {
    slug: "junk",
    name: "Junk",
    shortDescription: "Blank pages, test faxes, ads, garbled OCR",
    definition:
      "Blank documents, test faxes, advertisements, unreadable/garbled OCR, or anything with no clinical, medical, or administrative value. Document description is set to null for junk.",
    belongsHere: [
      "Blank pages",
      "Test faxes",
      "Advertisements with no clinical value",
      "Garbled or unreadable OCR output",
    ],
    doesNotBelong: [
      "Documents with readable administrative content (those are Others)",
      "Fee schedules, invoices, benefits notices (those are Others)",
    ],
    priority: {
      abnormalCriteria: [],
      normalCriteria: ["Always classify junk as 'normal'"],
    },
    dateExtraction: [{ priority: 1, dateField: "null", note: "Always return null for junk" }],
    edgeCases: [
      {
        scenario: "A fax with a fee schedule or an invoice",
        correctCategory: "others",
        explanation:
          "If the fax contains readable administrative content, it's Others, not Junk. Junk is ONLY for truly blank/garbled/advertising pages.",
      },
    ],
    color: "#6b7280",
  },
  {
    slug: "others",
    name: "Others",
    shortDescription: "Admin documents, consent forms, questionnaires that don't fit elsewhere",
    definition:
      "Anything that doesn't fit into any other category. Only use after genuinely exhausting all other categories. Includes routine administrative documents like new-patient consent/registration forms, clinic policy acknowledgments, PHIPA collection notices, and standalone questionnaires.",
    belongsHere: [
      "New-patient consent/registration forms",
      "Clinic policy acknowledgments and PHIPA collection notices",
      "Standalone questionnaires (intake, screening, health assessment, symptom checklists)",
      "Fee schedules, invoices, benefits/financial notices",
      "Generic clinic letters with no referral workflow",
    ],
    doesNotBelong: [
      "Patient consent forms WITH records-transfer intent (those are Oldchart)",
      "Documents that actually fit another clinical category",
    ],
    priority: {
      abnormalCriteria: [
        "Acute or serious clinical information",
        "Patient complaint requiring response",
        "Healthcare provider requesting urgent action",
        "Time-sensitive information (appointments, referral acceptances, wait-list notifications)",
        "Notification from hospital, long-term care, or public health unit",
        "Reportable disease notification",
        "Death notification",
        "Pharmacy drug interaction, allergy alert, or medication concern",
        "Appears to be misclassified and actually belongs in another category with abnormal findings",
      ],
      normalCriteria: [
        "Clearly junk/spam/advertising",
        "Routine notification with no action required",
        "Informational correspondence with no clinical relevance",
        "Duplicate document",
      ],
    },
    dateExtraction: [
      {
        priority: 1,
        dateField: "Most prominent clinically relevant date",
        note: "Prefer dates associated with clinical events over administrative processing dates",
      },
    ],
    edgeCases: [
      {
        scenario: "Standalone patient intake questionnaire arriving by fax",
        correctCategory: "others",
        explanation:
          "Standalone questionnaires not attached to a consult or referral are Others. If bundled with a consult note, classify by the parent document's category.",
      },
    ],
    color: "#a1a1aa",
  },
];
