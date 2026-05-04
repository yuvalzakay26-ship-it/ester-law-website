import brand from '../config/brand';

const en = {
    brand: {
        name: brand.en.name,
        subtitle: brand.en.subtitle,
        fullName: brand.en.fullName,
        tagline: brand.en.tagline,
        credentialLine: brand.en.credentialLine,
        address: brand.en.address,
        phone: brand.contact.phoneDisplayEn,
        email: brand.contact.email,
        whatsappLink: brand.contact.whatsappLink,
        domain: brand.domain,
    },

    common: {
        languageToggleLabel: "HE",
        languageSwitchAria: "החלפה לעברית",
        skipToContent: "Skip to main content",
        scrollToTop: "Back to top",
        openAccessibilityPanel: "Open accessibility menu",
        closeAccessibilityPanel: "Close accessibility menu",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        whatsapp: "WhatsApp",
        contactUs: "Contact"
    },

    seo: {
        siteName: "Ester Albalak · Attorney & Mediator",
        defaultTitle: "Ester Albalak | Attorney & Mediator — Family Law and Mediation",
        defaultDescription: "A law and mediation practice focused on family law — divorce mediation, prenuptial agreements, custody, support, and conflict resolution. Calm, professional, fully confidential.",
        ogImage: "/og-image.svg",
        locale: "en_US",
        pages: {
            home: {
                title: "Ester Albalak | Attorney & Mediator — Family Law and Mediation",
                description: "Legal counsel and mediation in family matters — divorce, prenuptial agreements, custody, support, and conflict resolution. A calm, results-focused approach with full confidentiality."
            },
            privacy: {
                title: "Privacy Policy | Ester Albalak, Attorney & Mediator",
                description: "Privacy policy of the Ester Albalak law office. How we collect and use information, and how attorney–client privilege applies."
            },
            accessibility: {
                title: "Accessibility Statement | Ester Albalak, Attorney & Mediator",
                description: "Accessibility statement for the Ester Albalak law office website — outlining our accessibility measures for equal access for people with disabilities."
            }
        }
    },

    nav: {
        links: [
            { name: "Home", href: "/#hero" },
            { name: "Practice areas", href: "/#services" },
            { name: "Process", href: "/#process" },
            { name: "FAQ", href: "/#faq" },
        ],
        cta: "Schedule a consultation",
        mobileMenuLabel: "Menu"
    },

    authority: {
        label: "Experience and credentials",
        items: [
            { title: "15+ years of practice", subtitle: "in family law and mediation" },
            { title: "Hundreds of cases", subtitle: "resolved by agreement" },
            { title: "Certified mediator", subtitle: "by the Israeli mediation institute" }
        ]
    },

    fit: {
        eyebrow: "Is this the right time to reach out?",
        title: "When should you consult an attorney and mediator?",
        subtitle: "Not every dispute requires a long court process. Sometimes one conversation at the right moment saves months — and sometimes years.",
        positiveTitle: "Worth reaching out if:",
        positives: [
            "You're at the start of a separation or divorce and want to understand your options.",
            "There's a dispute over children, assets, or support that needs to be resolved.",
            "You'd prefer a negotiated agreement — not a courtroom battle."
        ],
        negativeTitle: "Less of a fit if:",
        negatives: [
            "You're looking for a one-time consultation only, with no ongoing involvement.",
            "The other side has refused, at every stage, to talk or to find common ground."
        ],
        footnote: "Not sure? A short intro call is exactly for that — to figure out together whether the right path is legal, mediation, or a combination of the two."
    },

    miniAbout: {
        eyebrow: "A few words about me",
        title: "I believe the right mediation saves people years of pain",
        body: "I'm Ester Albalak, an attorney and certified mediator with over fifteen years of experience in family law. I support clients through some of the most sensitive moments of their lives — separation, divorce, prenuptial agreements, custody, and support. My approach is calm and outcome-focused, built on one belief: every dispute can end with dignity if it begins the right way.",
        signature: "Ester Albalak, Adv. & Mediator",
        portraitAlt: "Ester Albalak — Attorney and Mediator"
    },

    stickyCta: {
        label: "Schedule a consultation",
        ariaLabel: "Jump to the contact section to schedule a consultation"
    },

    hero: {
        eyebrow: "Legal counsel and mediation · Family law",
        title: "A calm legal resolution —",
        titleHighlight: "instead of a fight that spreads",
        subtitle: "I'm Ester Albalak, an attorney and family-law mediator. I guide families through difficult moments — with attentiveness, professionalism, and quiet steadiness. One goal: reach the right agreement, not prolong the dispute.",
        ctaPrimary: "Schedule an initial consultation",
        ctaPrimaryNote: "Fully confidential · No obligation",
        ctaSecondary: "How the process works →",
        microText: "Reply within 24 business hours",
        portraitAlt: "Ester Albalak — Attorney and Mediator",
        trustItemsLabel: "Experience and credentials",
        trustItems: [
            "Over 15 years in family law",
            "Specializing in divorce mediation and agreements",
            "Discreet support from start to finish"
        ],
        bullets: [
            "A calm, dignified resolution",
            "Protecting your interests",
            "A long-term perspective"
        ],
        trustCard: {
            title: "A clear, respectful process",
            badge: "Personal involvement",
            steps: [
                "Consultation and case understanding",
                "Building a legal or mediation strategy",
                "Support through to agreement or decision"
            ]
        }
    },

    pain: {
        intro: "If you're here, one of these probably feels familiar:",
        points: [
            "— You're in the middle of a separation and don't know where to begin.",
            "— There's a dispute over the children, assets, or support that won't resolve on its own.",
            "— You want to close this chapter quickly — without giving up what matters most.",
        ],
        outro: "There's a more dignified way. The right agreement, faster and less costly than a long court process."
    },

    services: {
        title: "Practice areas",
        subtitle: "Legal counsel and mediation across every stage of family life — from prenuptial agreements to inheritance disputes between siblings. Every matter is examined carefully, with discretion and judgment.",
        bottomLead: "Not sure if this applies to your situation?",
        bottomCta: "We can simply talk — no obligation",
        list: [
            {
                key: "divorce-mediation",
                title: "Divorce mediation",
                description: "Guiding couples to a negotiated divorce agreement — without the court, through understandings that respect both sides and, above all, protect the children.",
                badge: "Recommended"
            },
            {
                key: "agreements",
                title: "Prenuptial and cohabitation agreements",
                description: "Prenuptial agreements before and after marriage, cohabitation agreements, and internal agreements. Documents that protect you in advance — quietly and without drama.",
                badge: "Popular"
            },
            {
                key: "family-law",
                title: "Family law",
                description: "Representation in custody, visitation arrangements, support, and asset division. Professional handling at every level, with a clear strategy and measured goals.",
                badge: "Representation"
            },
            {
                key: "conflict-resolution",
                title: "Conflict resolution",
                description: "Mediation in family disputes, inheritance matters, and disputes between partners. A resolution that preserves the relationship — rather than leaving it broken.",
                badge: "Mediation"
            },
            {
                key: "consultation",
                title: "Initial legal consultation",
                description: "A focused consultation to assess the legal situation, present the options, and map the right next steps — before any decision is made.",
                badge: "Consultation"
            }
        ]
    },

    comparison: {
        eyebrow: "The difference most people learn the hard way",
        title: "Litigation vs. mediation",
        subtitle: "Two ways to resolve a family dispute. The difference is how long it takes, how much it costs — and how you'll feel afterward.",
        recommended: { label: "Mediation", tag: "Recommended path" },
        alternative: { label: "Court litigation", tag: "The classic path" },
        rows: [
            { topic: "Duration", recommended: "Weeks to months", alternative: "Often years" },
            { topic: "Total cost", recommended: "Known in advance", alternative: "High and unpredictable" },
            { topic: "Control of outcome", recommended: "In the parties' hands", alternative: "In the judge's hands" },
            { topic: "Impact on children", recommended: "Minimal", alternative: "Significant" },
            { topic: "Privacy", recommended: "Fully confidential", alternative: "Open court" },
            { topic: "Relationship after", recommended: "Maintainable", alternative: "Usually severed" }
        ],
        footnote: "Both paths are legitimate. But those who know — know that mediation is the quieter, faster route whenever it's possible.",
        decisionNudge: {
            lead: "Most couples don't regret",
            before: " trying mediation — only ",
            highlight: "how long it took to start",
            after: "."
        }
    },

    process: {
        title: "A clear process. Mutual respect.",
        subtitle: "You don't need to know everything in advance. I lead the process step by step, at your pace — from the first meeting to the signed agreement.",
        cta: "I want to start →",
        outcome: {
            title: "What's the outcome?",
            text: "A valid, approved legal agreement that serves both sides — a document that closes a chapter rather than opening another. No surprises, no drama."
        },
        steps: [
            { number: "01", title: "Initial consultation", description: "A first, fully confidential meeting — to understand the situation, present the options, and answer questions." },
            { number: "02", title: "Strategy and action", description: "Building a legal or mediation track with a clear goal, milestones, and a realistic timeline." },
            { number: "03", title: "Closing and agreement", description: "Signing a valid agreement, approved by the family court where required — and an orderly close to the chapter." }
        ]
    },

    testimonials: {
        title: "Clients who've already walked the path",
        subtitle: "Quotes are anonymized out of respect for privacy. Everything here is based on real cases, with the clients' permission.",
        list: [
            { quote: "We arrived after a year of arguing. Within three months we'd signed a divorce agreement — and to this day we still manage to talk to each other when it comes to the children.", name: "L., mother of two", identity: "Divorce mediation" },
            { quote: "I came under pressure after the other side threatened court. Noa managed to bring the temperature down and lead us to an agreement that saved me both financially and emotionally.", name: "A., business owner", identity: "Postnuptial agreement" },
            { quote: "An inheritance dispute among three siblings. Noa ran the process with endless patience, and we ended with an agreed division — without anyone hurting the others.", name: "R., from the business sector", identity: "Inheritance mediation" }
        ],
        closingLine: "If this sounds familiar — one conversation can open the path."
    },

    faq: {
        title: "Frequently asked questions",
        subtitle: "Answers to questions that come up in nearly every initial consultation.",
        cta: "Didn't find your answer? Let's talk",
        trustCard: {
            title: "Things worth knowing",
            badge: "Personal involvement",
            points: [
                "A fully confidential first consultation",
                "A clear plan from the very first meeting",
                "Personal contact — not through a secretary",
                "Full transparency on fees and timeline"
            ]
        },
        list: [
            { question: "What's the difference between an attorney and a mediator?", answer: "An attorney represents one side and works for that side's interests. A mediator represents neither side — their role is to help both parties reach a negotiated agreement. As a licensed attorney and certified mediator, I can serve in either role — but never both in the same matter, in line with professional ethics." },
            { question: "How long does a mediation process take?", answer: "Most cases close within four to eight sessions, over the course of two to four months. Complexity, the parties' willingness, and the number of open issues all affect the pace." },
            { question: "What happens if the other side refuses mediation?", answer: "Mediation is built on mutual consent. If one side declines, the matter can continue through traditional legal representation. Even then, the initial mapping stage often helps the parties reconsider." },
            { question: "Is a mediation agreement legally binding?", answer: "Yes. A mediation agreement that has been approved by the family court becomes a final judgment — fully binding, just like any other court ruling." },
            { question: "How much does a consultation or mediation cost?", answer: "The initial consultation is priced transparently in advance. Mediation processes and representation matters are priced based on scope, complexity, and time. Every quote is provided in writing before work begins — no surprises." },
            { question: "Is the information I share kept confidential?", answer: "Yes. Attorney–client privilege fully applies to anything shared during a consultation or representation. In mediation, the parties also sign a confidentiality agreement at the start of the process." },
            { question: "Do I need to come to the office?", answer: "Meetings can be held at the office or via video call, whichever is more convenient. In multi-party mediation, in-person meetings are often more effective — but this is flexible." },
            { question: "Are children involved in the process?", answer: "Generally no. Children do not attend parental mediation sessions. In more complex cases — and only with both parents' consent — a meeting with an additional professional can be arranged to bring the children's voice into the room in a controlled, respectful way." },
            { question: "We've already reached an agreement on our own — do we still need a lawyer?", answer: "It's strongly recommended. An informal agreement that isn't drafted properly or approved by the court can become unenforceable when a dispute arises. Professional drafting and court approval are the difference between a binding instrument and a friendly proposal." },
            { question: "How do we start?", answer: "Easily — send a message through the form, WhatsApp, or email. Within 24 business hours I'll get back to you to schedule an initial consultation." }
        ]
    },

    contactSection: {
        eyebrow: "Initial consultation",
        title: "We can start with a single conversation",
        subtitle: "An initial consultation — fully confidential, without pressure, with a clear answer on where to go from here.",
        phone: brand.contact.phoneDisplayEn,
        email: brand.contact.email,
        phoneLink: brand.contact.phoneLink,
        whatsappLink: brand.contact.whatsappLink,
        form: {
            name: { label: "Name", placeholder: "Your full name" },
            phone: { label: "Phone", placeholder: "050-1234567" },
            email: { label: "Email", optional: "optional", placeholder: "you@example.com" },
            message: { label: "Additional details", optional: "optional", placeholder: "If you'd like — a few words about the matter. Every message is read personally." },
            submit: "Send inquiry",
            sending: "Sending...",
            successTitle: "Thank you — your message was received.",
            successMessage: "I'll get back to you shortly, usually within 24 business hours, to schedule a consultation.",
            reset: "Send another",
            privacyNote: "Your message is kept fully confidential. Attorney–client privilege applies.",
            privacyLink: "Privacy policy",
            trustItems: [
                "Reply within 24 business hours",
                "First meeting with no obligation",
                "Full discretion and privilege"
            ],
            errors: {
                name: "Please enter a name",
                phone: "Please enter a valid phone number",
                submit: "Submission failed. Please try again or call directly."
            }
        },
        altTitle: "Prefer to talk directly?",
        contactInfo: {
            phone: "Phone",
            whatsapp: "WhatsApp",
            email: "Email"
        }
    },

    contact: {
        title: "Let's talk.",
        subtitle: "An initial consultation, with no obligation — to understand the legal situation together and review the options available to you.",
        trustTitle: "What happens after you reach out?",
        trustPoints: [
            "I'll get back to you within 24 business hours.",
            "We'll schedule a short consultation to understand the matter.",
            "You'll receive an initial assessment and a transparent fee proposal — in writing."
        ],
        altTitle: "More ways to get in touch",
        quickActions: {
            phone: `Call: ${brand.contact.phoneDisplayEn}`,
            whatsapp: "Send a message",
            email: "Send an email"
        },
        form: {
            name: "Full name *",
            phone: "Phone *",
            email: "Email (optional)",
            subject: "Subject",
            subjectPlaceholder: "Choose a subject...",
            subjects: [
                "Divorce mediation",
                "Prenuptial / cohabitation agreement",
                "Custody, support, and visitation",
                "Family court representation",
                "Inheritance / conflict resolution",
                "Initial legal consultation",
                "Other"
            ],
            message: "Details *",
            submit: "Send",
            sending: "Sending...",
            successTitle: "Thank you!",
            successMessage: "Your message was received. I'll be in touch as soon as possible to schedule a consultation.",
            reset: "Send another",
            whatsappAction: "Continue on WhatsApp",
            privacyNote: "Your message is kept fully confidential.",
            privacyLink: "Privacy policy",
            errors: {
                name: "Please enter your full name",
                phone: "Please enter a valid phone number",
                email: "Invalid email address",
                message: "Please write a few words about the matter"
            }
        }
    },

    footer: {
        copyright: "All rights reserved.",
        disclaimer: "Information on this site is general and does not constitute legal advice. Each matter is examined on its own merits and requires individual consultation.",
        compliance: "This website complies with Israeli Standard SI 5568 at Level AA.",
        privacy: "Privacy policy",
        accessibility: "Accessibility statement"
    },

    legal: {
        privacy: {
            title: "Privacy Policy",
            lastUpdated: "Last updated: May 2026",
            sections: [
                {
                    heading: "General",
                    content: "The Ester Albalak law office (\"the office\", \"we\") respects the privacy of visitors to this website and operates in accordance with Israel's Protection of Privacy Law, 5741-1981 and its regulations, and subject to attorney–client privilege under applicable law. This document explains what information we collect on the site, the purposes for which it is used, and how we keep it safe."
                },
                {
                    heading: "Information we collect",
                    content: "When you use the site we may collect the following details — but only when you choose to provide them, by submitting the contact form or reaching out directly:",
                    items: [
                        "Full name",
                        "Phone number",
                        "Email address",
                        "The content of any message you choose to send"
                    ]
                },
                {
                    heading: "How we use your information",
                    content: "Information you provide is used solely to get back to you, schedule a consultation, and handle your inquiry professionally. We do not use your details for marketing or promotional emails, and we do not share them with third parties without your explicit consent — except where disclosure is required by law or by a competent authority."
                },
                {
                    heading: "Attorney–client privilege",
                    content: "Communications between client and attorney — including an initial inquiry — are protected by attorney–client privilege under the Israeli Bar Association Law, 5721-1961. Information shared for the purpose of obtaining advice may not be disclosed except with the client's consent or in narrow circumstances permitted by law."
                },
                {
                    heading: "Data security",
                    content: "We apply customary, reasonable security measures to protect the information from unauthorized access, alteration, or disclosure. That said, no system can guarantee absolute immunity from incidents, intrusions, or misuse — submitting information through the site is at your own residual risk."
                },
                {
                    heading: "Third parties and service providers",
                    content: "We may rely on external service providers to operate the site — including hosting, contact-form delivery, and basic performance measurement. These providers are required to act in line with applicable privacy laws. We do not sell, rent, or trade your personal information in any form."
                },
                {
                    heading: "Cookies",
                    content: "The site uses only basic operational cookies, mainly to remember user preferences (such as language and personal accessibility settings) and to improve the browsing experience. You can block or delete cookies at any time through your browser settings — note that doing so may affect how parts of the site display."
                },
                {
                    heading: "Your rights",
                    content: "Under Israel's Protection of Privacy Law, you have the following rights regarding information stored about you:",
                    items: [
                        "The right to access the personal information we hold about you",
                        "The right to request correction if information is inaccurate or out of date",
                        "The right to request deletion of information from our systems",
                        "The right to withdraw your consent to further processing"
                    ]
                },
                {
                    heading: "Changes to this policy",
                    content: "We may update this policy from time to time. The updated version will be published on this page and will apply from the date of publication. We recommend reviewing the policy occasionally to stay up to date."
                }
            ],
            contact: {
                heading: "Privacy contact",
                intro: "For any question, request to exercise a right, or comment regarding privacy, feel free to reach out:",
                businessPrefix: "Office:",
                phonePrefix: "Phone:",
                emailPrefix: "Email:"
            }
        },
        accessibility: {
            title: "Accessibility Statement",
            lastUpdated: "Last updated: May 2026",
            intro: "At the Ester Albalak law office we treat accessibility as a core professional and social value. We are committed to enabling every person — including people with disabilities — to browse the site and access information independently, comfortably, and with respect.",
            sections: [
                {
                    heading: "Standards and legal compliance",
                    content: "The site is adapted to the requirements of Israel's Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013, and meets Israeli Standard SI 5568 at Level AA — equivalent to W3C's WCAG 2.1 Level AA."
                },
                {
                    heading: "Adjustments implemented on the site",
                    content: "Among other measures, the following adjustments were implemented as part of the site's accessibility work:",
                    items: [
                        "Full keyboard navigation across every page — no mouse required",
                        "Sufficient color contrast between text and background, with the option to increase contrast on demand",
                        "Screen-reader support via semantic heading structure, ARIA labels, and alt text for images",
                        "A dedicated accessibility menu allowing personal adjustments to text size, contrast, grayscale, link highlighting, and animation pausing",
                        "A skip-to-main-content shortcut on every page",
                        "Accessible forms with linked labels and clear error messages",
                        "Compatibility with modern browsers and devices across resolutions, including mobile and tablet"
                    ]
                },
                {
                    heading: "Known accessibility limitations",
                    content: "We work continuously to maintain and improve the site's accessibility. You may still encounter a component, file, or third-party content that has not yet been fully made accessible — for example, embedded maps, external documents, or content embedded from other sites. In such cases, please let us know so we can address it."
                }
            ],
            contactHeading: "Accessibility contact",
            contact: {
                intro: "If you encounter an accessibility issue on the site, or need an additional adjustment to receive the service, please reach out and we'll handle it as soon as possible:",
                rolePrefix: "Accessibility coordinator:",
                roleName: "Ester Albalak",
                phonePrefix: "Phone:",
                emailPrefix: "Email:",
                responseNote: "We aim to respond to accessibility inquiries within 14 business days of receipt."
            }
        }
    },

    a11y: {
        title: "Accessibility options",
        subtitle: "Adjust the site to your needs",
        textSize: "Text size",
        increase: "Increase text",
        decrease: "Decrease text",
        currentSize: "Current size",
        contrast: "High contrast",
        grayscale: "Grayscale",
        highlightLinks: "Highlight links",
        pauseAnimations: "Pause animations",
        reset: "Reset settings",
        statementLink: "Read full accessibility statement",
        close: "Close"
    }
};

export default en;
