// Configuration
const defaultConfig = {
    company_name: "Feathered Greeters Ushering Services",
    owner_name: "Catherine",
    location: "Nkumba, Entebbe, Uganda",
    email: "catherinenanyunja38.com",
    phone: "+256 765 046 922",
    whatsapp: "+256 765 046 922",
    instagram: "@featheredgreeters",
    tiktok: "@featheredgreeters"
};

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

// Contact Management
function updateContactLinks(config) {
    const contactInfo = {
        email: config.email || defaultConfig.email,
        phone: config.phone || defaultConfig.phone,
        whatsapp: config.whatsapp || defaultConfig.whatsapp,
        instagram: config.instagram || defaultConfig.instagram,
        tiktok: config.tiktok || defaultConfig.tiktok
    };

    // Update contact buttons with their respective links
    updateEmailLink(contactInfo.email, config.owner_name || defaultConfig.owner_name);
    updatePhoneLink(contactInfo.phone);
    updateWhatsAppLink(contactInfo.whatsapp, config.owner_name || defaultConfig.owner_name);
    updateSocialLinks(contactInfo.instagram, contactInfo.tiktok);
}

function updateEmailLink(email, ownerName) {
    const emailBtn = document.getElementById('email-btn');
    emailBtn.href = `mailto:${email}?subject=Feathered Greeters Ushering Services Inquiry&body=Hello ${ownerName}, I'm interested in your ushering services for my upcoming event.`;
}

function updatePhoneLink(phone) {
    const phoneBtn = document.getElementById('phone-btn');
    phoneBtn.href = `tel:${phone}`;
}

function updateWhatsAppLink(whatsapp, ownerName) {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappNumber = whatsapp.replace(/\s+/g, '').replace(/^\+/, '');
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=Hello ${ownerName}, I'm interested in your ushering services for my event.`;
}

function updateSocialLinks(instagram, tiktok) {
    // Update Instagram link
    const instagramBtn = document.getElementById('instagram-btn');
    const instagramHandle = instagram.replace('@', '');
    instagramBtn.href = `https://instagram.com/${instagramHandle}`;

    // Update TikTok link
    const tiktokBtn = document.getElementById('tiktok-btn');
    const tiktokHandle = tiktok.replace('@', '');
    tiktokBtn.href = `https://tiktok.com/@${tiktokHandle}`;
}

// Element SDK Implementation
async function onConfigChange(config) {
    updateTextContent('company-name', config.company_name);
    updateTextContent('hero-title', config.company_name);
    updateTextContent('company-name-about', config.company_name);
    updateTextContent('company-name-about2', config.company_name);
    updateTextContent('company-name-footer', config.company_name);

    // Update owner name
    const ownerName = config.owner_name || defaultConfig.owner_name;
    updateTextContent('owner-name', `Meet ${ownerName} & Her Team`);
    updateTextContent('owner-name-text', ownerName);
    updateTextContent('owner-name-contact', ownerName);

    // Update location
    updateTextContent('location-text', config.location);
    updateTextContent('location-contact', config.location);
    updateTextContent('location-footer', config.location);

    // Update contact information
    updateTextContent('email-display', config.email);
    updateTextContent('phone-display', config.phone);
    updateTextContent('whatsapp-display', config.whatsapp);
    updateTextContent('instagram-display', config.instagram);
    updateTextContent('tiktok-display', config.tiktok);

    updateContactLinks(config);
}

function updateTextContent(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value || defaultConfig[elementId.replace(/-.*$/, '')];
    }
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map(
        Object.entries(defaultConfig).map(([key, defaultValue]) => [
            key,
            config[key] || defaultValue
        ])
    );
}

// Initialization
function initializeApp() {
    // Initialize the Element SDK
    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }

    // Initialize contact links with default values
    updateContactLinks(defaultConfig);
}

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);