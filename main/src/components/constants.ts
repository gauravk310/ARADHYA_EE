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

// Navigation items
export const navItems = [
    { label: "Home", href: "#home" },
    {
        label: "About Us",
        href: "#about",
        children: ["Company Profile", "Vision & Mission", "Message from MD", "Leadership"],
    },
    {
        label: "Services",
        href: "#services",
        children: ["Transmission", "Railways", "Civil", "Distribution"],
    },

    {
        label: "Investor",
        href: "#",
        children: ["Financial Results", "Annual Reports", "Shareholding Pattern"],
    },
    { label: "Media", href: "#", children: ["News", "Gallery"] },
    {
        label: "Careers",
        href: "#",
        children: ["Current Openings", "Life at ARADHYA EE"],
    },
    {
        label: "Contact",
        href: "#",
        children: ["Contact Us", "Locations"],
    },
    { label: "ESS Portal", href: "#" },
];

// Hero slides
export const slides = [
    {
        bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
        title: "Transmission",
        desc: "ARADHYA EE provides the concept to commissioning solutions of Turnkey Projects. Our EPC division offers comprehensive Engineering, Procurement and Construction services in areas of power Transmission & Distribution as well. The key...",
    },
    {
        bg: "/railways-hero.jpg",
        title: "Railways",
        desc: "Overhead Electrification works in Indian Railways. The company has commissioned Overhead Electrification Work for Northern Railways and continues to grow in this critical infrastructure domain.",
    },
    {
        bg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
        title: "Civil Infrastructure",
        desc: "In its endeavour to diversify and gain expertise in construction industry, ARADHYA EE has forayed into the civil sector as well. The Company is engaged in Civil Works of national importance.",
    },
];

// Services
export const services = [
    {
        icon: "⚡",
        label: "Transmission",
        desc: "Transmission forms a critical link in the power sector's value chain. India's power generation capacities are unevenly dispersed across the country creating...",
    },
    {
        icon: "🚆",
        label: "Railways",
        desc: "Overhead Electrification works in Indian Railways. The company has commissioned Overhead Electrification Work for Northern Railways. On-going...",
    },
    {
        icon: "🏗️",
        label: "Civil",
        desc: "In its endeavour to diversify and gain expertise in construction industry, ARADHYA EE has forayed into the civil sector as well. The Company is engaged in Civil Works...",
    },
    {
        icon: "🔌",
        label: "Distribution",
        desc: "ARADHYA EE provides end-to-end solutions in power distribution networks including HT/LT line construction, substation erection, underground cabling and rural electrification projects...",
    },
];

// Activities
export const activities = [
    {
        img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
        title:
            "Welcoming the New Year Together: A Celebration of Joy, Teamwork, and New Beginnings",
    },
    {
        img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80",
        title:
            "Celebrating Christmas Together: A Festive Day of Team Spirit and Joy at the Workplace",
    },
    {
        img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
        title: "Blood Donation Camp on the Occasion of Founder's Day",
    },
];
