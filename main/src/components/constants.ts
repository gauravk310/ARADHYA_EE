// Shared color constants used across components
export const COLORS = {
    teal: "#0d6e7a",
    darkTeal: "#0a5661",
    orange: "#e8621a",
    darkOrange: "#c45216",
    navy: "#1a2744",
    lightTeal: "#e0f2f1",
    gray: "#f5f5f5",
    text: "#333",
    muted: "#555",
    // Mapping old names to new colors to avoid breaking other components immediately
    blue: "#0d6e7a",
    darkBlue: "#0a5661",
    red: "#e8621a",
    lightBlue: "#e0f2f1",
};

// Contact Information
export const CONTACT_INFO = {
    phone: "+91 99214 46398",
    phoneHref: "tel:+919921446398",
    email: "balajisalgude@gmail.com",
    whatsapp: "https://wa.me/919921446398",
    address: "House No 20/1/292, Kuranwadi, Mohol, Solapur - 413214",
    addressFull: "House No 20/1/292, Kuranwadi, Mohol, Tal Mohol, Solapur, Maharashtra - 413214",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=House+No+20/1/292,+Kuranwadi,+Mohol,+Solapur+-+413214",
};

// Navigation items
export const navItems = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/about",
        children: [
            { label: "Company Profile", href: "/about/profile" },
            { label: "Vision & Mission", href: "/about/vision-mission" },
            { label: "Message from MD", href: "/about/message-from-md" },
        ],
    },
    {
        label: "Services",
        href: "/services",
        children: [
            { label: "Transmission", href: "/services/transmission" },
            { label: "Railways", href: "/services/railways" },
            { label: "Civil", href: "/services/civil" },
            { label: "Distribution", href: "/services/distribution" },
        ],
    },
    { label: "Reference", href: "/reference" },
    {
        label: "Investor",
        href: "#",
        children: [
            { label: "Investor Relations", href: "/investor/relations" },
            { label: "Corporate Governance", href: "/investor/governance" },
        ],
    },
    {
        label: "Media",
        href: "#",
        children: [
            { label: "Projects", href: "/media/projects" },
            { label: "Gallery", href: "/media/gallery" },
        ],
    },
    { label: "Why AEE", href: "/careers/why-aee" },
    { label: "Contact Us", href: "/contact/contact-us" },
];

// Hero slides
export const slides = [
    {
        bg: "/railways-hero.jpg",
        title: "Transmission",
        slug: "transmission",
        desc: "ARADHYA EE provides the concept to commissioning solutions of Turnkey Projects. Our EPC division offers comprehensive Engineering, Procurement and Construction services in areas of power Transmission & Distribution as well. The key...",
    },
    {
        bg: "/Gallary/img6.jpeg",
        title: "Railways",
        slug: "railways",
        desc: "Overhead Electrification works in Indian Railways. The company has commissioned Overhead Electrification Work for Northern Railways and continues to grow in this critical infrastructure domain.",
    },
    {
        bg: "/Gallary/img1.jpeg",
        title: "Civil Infrastructure",
        slug: "civil",
        desc: "In its endeavour to diversify and gain expertise in construction industry, ARADHYA EE has forayed into the civil sector as well. The Company is engaged in Civil Works of national importance.",
    },
];

// Services
export const services = [
    {
        icon: "⚡",
        label: "Transmission",
        slug: "transmission",
        desc: "Transmission forms a critical link in the power sector's value chain. India's power generation capacities are unevenly dispersed across the country creating...",
    },
    {
        icon: "🚆",
        label: "Railways",
        slug: "railways",
        desc: "Overhead Electrification works in Indian Railways. The company has commissioned Overhead Electrification Work for Northern Railways. On-going...",
    },
    {
        icon: "🏗️",
        label: "Civil",
        slug: "civil",
        desc: "In its endeavour to diversify and gain expertise in construction industry, ARADHYA EE has forayed into the civil sector as well. The Company is engaged in Civil Works...",
    },
    {
        icon: "🔌",
        label: "Distribution",
        slug: "distribution",
        desc: "ARADHYA EE provides end-to-end solutions in power distribution networks including HT/LT line construction, substation erection, underground cabling and rural electrification projects...",
    },
];

// Service detail page content
export const serviceDetails: Record<string, {
    title: string;
    slug: string;
    bannerImage: string;
    paragraphs: string[];
    highlights: string[];
}> = {
    transmission: {
        title: "Transmission",
        slug: "transmission",
        bannerImage: "/railways-hero.jpg",
        paragraphs: [
            "ARADHYA EE provides concept to commissioning solutions of Turnkey Projects. Our EPC division offers comprehensive Engineering, Procurement and Construction services in areas of Power Transmission & Distribution.",
            "Transmission forms a critical link in the power sector's value chain. India's power generation capacities are unevenly dispersed across the country, creating a need for a robust transmission network. ARADHYA EE is committed to strengthening the nation's power transmission backbone.",
            "Our experienced team handles projects ranging from 33 kV to 765 kV transmission lines, including survey, design, tower fabrication and erection, stringing, and commissioning. We also undertake construction and augmentation of Extra High Voltage (EHV) substations.",
            "The company has successfully executed multiple turnkey transmission line projects for state and central utilities across India, earning a reputation for timely delivery, quality workmanship, and adherence to safety standards.",
        ],
        highlights: [
            "33 kV to 765 kV Transmission Lines",
            "EHV Substation Construction & Augmentation",
            "Turnkey EPC Solutions",
            "Survey, Design, Erection & Commissioning",
            "Tower Fabrication & Foundation Works",
            "Stringing & Testing of Conductors",
        ],
    },
    railways: {
        title: "Railways",
        slug: "railways",
        bannerImage: "/Gallary/img6.jpeg",
        paragraphs: [
            "ARADHYA EE has emerged as a key player in the Indian Railways electrification sector. The company has been engaged in Overhead Electrification (OHE) works for Indian Railways, contributing to the nation's ambitious railway electrification program.",
            "The company has commissioned Overhead Electrification Work for Northern Railways and continues to grow in this critical infrastructure domain. Our Railway Electrification division undertakes end-to-end OHE works including design, supply, erection, testing and commissioning.",
            "We specialize in 25 kV AC single phase traction overhead equipment installation, along with associated switching stations, sub-sectioning and paralleling posts (SSP/SP), and SCADA systems for remote monitoring and control.",
            "With a dedicated team of railway electrification professionals and modern equipment, ARADHYA EE is well-positioned to support the Government of India's mission of 100% railway electrification.",
        ],
        highlights: [
            "Overhead Electrification (OHE) Works",
            "25 kV AC Traction Systems",
            "Switching Stations & SSP/SP Posts",
            "SCADA Systems for Remote Control",
            "Design, Supply, Erection & Commissioning",
            "Works for Northern Railways & Other Zones",
        ],
    },
    civil: {
        title: "Civil",
        slug: "civil",
        bannerImage: "/Gallary/img1.jpeg",
        paragraphs: [
            "In its endeavour to diversify and gain expertise in the construction industry, ARADHYA EE has forayed into the civil infrastructure sector as well.",
            "The Company is engaged in Civil Infrastructure Works which includes Design, Survey, Supply, Construction of different category of Quarters, Construction of Warehouses, Roads, Water Pipelines, Office Building for MP Warehousing & Logistic Corporation (MPWLC), ACB(India)Ltd, TRN Energy Pvt Ltd etc.",
            "Our civil construction capabilities extend to residential quarters, commercial buildings, industrial warehouses, and public infrastructure projects. We follow stringent quality control measures and employ modern construction techniques to ensure durable and aesthetically superior structures.",
            "ARADHYA EE's civil division is equipped with experienced engineers, project managers, and skilled labour force to handle projects of varied scale and complexity, ensuring timely delivery and cost effectiveness.",
        ],
        highlights: [
            "Design, Survey & Supply",
            "Residential Quarters Construction",
            "Warehouses & Industrial Buildings",
            "Roads & Water Pipelines",
            "Office Buildings & Commercial Spaces",
            "Government & Private Sector Projects",
        ],
    },
    distribution: {
        title: "Distribution",
        slug: "distribution",
        bannerImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80",
        paragraphs: [
            "ARADHYA EE provides end-to-end solutions in power distribution networks, playing a vital role in the last-mile connectivity of electricity to consumers across urban and rural areas.",
            "Our distribution services encompass HT/LT line construction, substation erection, underground cabling, aerial bunched conductor (ABC) installation, and rural electrification projects under government schemes such as DDUGJY and Saubhagya.",
            "The company undertakes turnkey distribution projects including design, procurement, construction, testing, and commissioning of 11 kV and 33 kV distribution substations, HT/LT overhead lines, and underground cable networks.",
            "With a strong commitment to quality and safety, ARADHYA EE has successfully executed distribution projects for various state electricity boards and distribution companies, helping bridge the gap between power generation and end-user consumption.",
        ],
        highlights: [
            "HT/LT Line Construction",
            "Substation Erection (11 kV & 33 kV)",
            "Underground Cabling Networks",
            "Aerial Bunched Conductor (ABC) Installation",
            "Rural Electrification (DDUGJY / Saubhagya)",
            "Smart Metering & Distribution Automation",
        ],
    },
};

// Activities
export const activities = [
    {
        img: "/Gallary/img2.jpeg",
        title:
            "Transmission Line Construction: High-Voltage Tower Erection & Stringing Across Challenging Terrains",
    },
    {
        img: "/Gallary/img1.jpeg",
        title:
            "On-Site Safety Training: Ensuring Workplace Safety Standards Across All Project Sites",
    },
    {
        img: "/Gallary/img3.jpeg",
        title:
            "Substation Commissioning: Successful Installation & Testing of Power Transformers",
    },
    {
        img: "/Gallary/img4.jpeg",
        title:
            "Safety Awareness Program: Team Pledge for Zero Accident Work Culture",
    },
];
