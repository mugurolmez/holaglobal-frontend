export const mainAppStyles = {

    healthInsuranceButtonBox: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '1000', // Gerekirse, diğer öğelerin önünde olacak şekilde ayarlayabilirsiniz
    },

    healthInsuranceButtonButton: {

        height: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' }, // Ekran boyutuna göre özel yükseklik
        width: { xs: '150px', sm: '200px', md: '250px', lg: '300px', xl: '350px' }, // Ekran boyutuna göre özel genişlik
        backgroundColor: '#212121',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '20px',
        borderColor: 'white', // Beyaz çerçeve rengi
        borderWidth: '2px', // Çerçeve kalınlığı
        borderStyle: 'solid', // Çerçeve stili
    },
    whatsAppButtonFloatingIcon: {

        backgroundColor: '#25D366',
        transition: 'background-color 0.3s, color 0.3s', // Geçiş efekti ekledik
        '&:hover': {
            backgroundColor: '#FFFFFF', // Hover durumunda arka plan rengini beyaz yap
        },
        
    },
    whatsappButtonIcon:{
        
            fontSize: {xs: '75px', sm: '100px', md: '120px', lg: '140px', xl: '170px' },
    
           color: 'white' ,
           transition: 'background-color 0.3s, color 0.3s', // Geçiş efekti ekledik
           '&:hover': {
             color: '#25D366',
           
           }

    },


    pageBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: '#212121',
        minHeight: '70vh',
        textAlign: 'left'
    },

    pageFormBox: {
        margin: '2px',
        alignItems: 'center',
        maxHeight: 'flex',
        backgroundColor: '#e94e1b',
        width: { xs: '100%', md: '40%' },
        padding: 2
    },
    pageTextBox: {
        width: { xs: '100%', md: '60%' },
        padding: 2

    },


    formItemBox: {
        margin: '2px'
    },
    customerFormTitle: {
        margin: '1rem 0', // Margin değerini belirleyin
        fontSize: '1.5rem', // Yazı boyutunu belirleyin
        fontWeight: 'bold', // Yazı kalınlığını belirleyin
        color: 'white', // Yazı rengini belirleyin
        textAlign: 'center'
    },
    button: {
        width: '100%',
        height: '70px',
        marginBottom: '2%',
        color: 'white'

    },
    customerFormBox: {
        margin: '10px',
        alignItems: 'center',
        height: '100%'
    },

    textField: {
        width: '100%',
        marginBottom: '2%',
    },
    select: {
        width: '100%',
        marginBottom: '2%',
        backgroundColor: 'white',

    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black', // Metin rengi
        width: '100%',
        marginBottom: '2%',
        '& .MuiSvgIcon-root': {
            color: '#e94e1b', // İkon rengi
        },
        layout: {
            color: 'black',
            backgroundColor: 'black'
        }
    }
};