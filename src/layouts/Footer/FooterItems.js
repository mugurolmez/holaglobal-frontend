export const mainFooterItems = (t) => {
    return {
        contactInfo: [
            { text: t('mainFooterItems.contactInfo.title'), variant: 'h6' },
            { text: t('mainFooterItems.contactInfo.address'), variant: 'body2' },
            { text: t('mainFooterItems.contactInfo.phone'), variant: 'body2' },
            { text: t('mainFooterItems.contactInfo.email'), variant: 'body2' }
        ],

        aboutInfo: [
            { text: t('mainFooterItems.aboutInfo.title'), variant: 'h6' },
            { text: t('mainFooterItems.aboutInfo.description'), variant: 'body2' }
        ],

        quickLinks: [
            { text: t('mainFooterItems.quickLinks.title'), variant: 'h6' },
            { text: t('mainFooterItems.quickLinks.home'), href: '/' },
            { text: t('mainFooterItems.quickLinks.services'), href: '/' },
            { text: t('mainFooterItems.quickLinks.faq'), href: '/sss' },
            { text: t('mainFooterItems.quickLinks.contact'), href: '' }
        ],

        socialMedia: [
            { text: t('mainFooterItems.socialMedia.title'), variant: 'h6' },
            { text: t('mainFooterItems.socialMedia.facebook'), href: 'https://www.facebook.com/profile.php?id=61552109386767' },
            { text: t('mainFooterItems.socialMedia.twitter'), href: 'https://twitter.com' },
            { text: t('mainFooterItems.socialMedia.linkedin'), href: 'https://linkedin.com' },
            { text: t('mainFooterItems.socialMedia.instagram'), href: 'https://instagram.com/holatercume' }
        ],
    };
};
