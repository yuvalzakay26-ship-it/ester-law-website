const MOBILE_UA = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;

export function isMobileDevice() {
    if (typeof navigator === 'undefined') return false;
    if (navigator.userAgentData?.mobile != null) return navigator.userAgentData.mobile;
    return MOBILE_UA.test(navigator.userAgent || '');
}

function extractDigits(value) {
    return String(value || '').replace(/\D+/g, '');
}

export function getWhatsAppLink(input, text) {
    const phone = extractDigits(input);
    if (!phone) return '#';
    const base = isMobileDevice()
        ? `https://wa.me/${phone}`
        : `https://web.whatsapp.com/send?phone=${phone}`;
    if (!text) return base;
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}text=${encodeURIComponent(text)}`;
}
