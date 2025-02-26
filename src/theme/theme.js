const theme = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        fontFamily: 'My-Font',
    },
    fonts: {
        regular: 'My-Font',  
        
      },
    videoContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: 200,
        marginTop: 50,

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 5,
    },
    description: {
        fontSize: 12,
        marginBottom: 20,
        color: '#555',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floatingButton: {
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginLeft: 10,
    },
    count: {
        fontSize: 18,
        marginBottom: 20,
        color: '#555',
    },
    movieCard: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        alignItems: 'center',
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    movieTitle: {
        fontSize: 18,
        fontFamily: 'My-Font',
        marginBottom: 5,
    },
    watchButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    watchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    colors: {
        background: '#f4f4f4',
        text: '#333333',
        primary: '#007AFF',
        border: '#DDDDDD',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        width: 300,
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    dialogTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    dialogMessage: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 10,
      },
      confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      cancelButton: {
        backgroundColor: '#f44336',
        borderRadius: 5,
        paddingVertical: 10,
      },
      cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
    
};

export default theme;