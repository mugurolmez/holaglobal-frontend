export const navibarStyles = {
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e94e1b',
        minHeight: '5vh',
        padding: '1rem',
        boxSizing: 'border-box',
        textAlign: 'center', // Yazıyı yatayda ortalamak için
        width: '100%' // Genişliği tam boyutta tutmak için
    },
    tabs: {
        '& .MuiTab-root.Mui-selected': {
            color: 'black',
        },
        '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
            justifyContent: 'center', // Tab'ların merkezde hizalanmasını sağlar
        },
        '& .MuiTab-root': {
            minWidth: { xs: '80px', sm: '100px', md: '150px' },
            padding: { xs: '0 4px', sm: '0 8px', md: '0 12px' },
            fontSize: { xs: '8px', sm: '12px', md: '16px', lg: '22px', xl: '22px' },
        },
    },
    label: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: { xs: '10px', sm: '12px', md: '16px', lg: '22px', xl: '22px' },
    },
    logoBox: {
        maxWidth: '100px',
        display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
    },
};
