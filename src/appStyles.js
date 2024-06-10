export const mainAppStyles = {
    box: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'orange',
        alignItems: 'center',
        width: '100%',
    },
   
    formBox: {
        margin: '2px',
        alignItems: 'center',
        maxHeight: 'flex',
        backgroundColor: '#e94e1b',
    },
    formItemBox: {
        margin: '2px'
    },
    formTitle: {
        margin: '1rem 0', // Margin değerini belirleyin
        fontSize: '1.5rem', // Yazı boyutunu belirleyin
        fontWeight: 'bold', // Yazı kalınlığını belirleyin
        color: 'white', // Yazı rengini belirleyin
        textAlign: 'center'
    },
    button:{
    width:'100%',
    marginBottom:'2%',
    
    },
    textField:{
        width:'100%',
        marginBottom:'2%',
    },
    select:{
        width:'100%',
        marginBottom:'2%',
        backgroundColor:'white',
       
    },
    datePicker:{
        backgroundColor: 'white',
        color: 'black', // Metin rengi
        width: '100%',
        marginBottom: '2%',
        '& .MuiSvgIcon-root': {
          color: '#e94e1b', // İkon rengi
        },
        layout:{
            color:'black',
            backgroundColor:'black'
        }
      }
};