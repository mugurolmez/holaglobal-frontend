


export const navibarStyles = {
    box: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 1, 
        borderColor: 'divider' ,
        backgroundColor:'#ed1c24',   
        alignItems:'center',
        width: '100%',
    },
    tabs: {
        
        '& .MuiTab-root.Mui-selected': {
            color: 'black', // Seçilen sekmenin metin rengi beyaz olacak
        },
    
       
    },
    label: {
       
        color: '#FFFFFF', 
        fontWeight: 'bold' ,
        fontSize:'1rem'
        
    },
    gridLogo:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-center',
        justifyContent: 'center',
        p: 2,
        pl:15 
        
    },

    gridComminication:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center', 
            pr: 2, // Sağdan biraz padding ekleyin
          },
    gridNavi:{
        
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            p: 2, // Sağdan biraz padding ekleyin
    }
  
};
