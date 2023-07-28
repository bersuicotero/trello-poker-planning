const pageStyles = {
  h1Title: {
    textAlign: "center",
    color: " rgb(255, 255, 255)",
    backgroundColor: "rgb(65 119 47)",
    padding: ".4rem",
    marginBottom: "8px",
    marginTop: 0,
  },
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    height: "100vh",
    width: "100vw",
  },
  aside: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2rem",
    maxHeight: "86vh",
    backgroundColor: "rgb(16, 18, 4)",
    borderRadius: "10px",
  },
  h3: {
    color: "rgb(182, 194, 207)",
    width: "80%",
  },
  h5: {
    color: "rgb(182, 194, 207)",
    width: "80%",
    margin: 0,
  },
  trelloCardsContainer: {
    overflowY: "scroll",
    height: "70vh",
    width: "80%",
  },
  trelloCard: {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    border: "1px solid rgb(71 82 90)",
    borderRadius: "10px",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(34, 39, 43)",
  },
  trelloCardHeader: {
    padding: "10px",
    borderBottom: "2px solid rgb(71 82 90)",
    textAlign: "center",
    width: "95%",
  },
  trelloCardBody: {
    textAlign: "center",
    padding: "10px",
  },
  article: {
    marginLeft: "2rem",
  },
  estimationsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(34, 39, 43)',
    borderRadius: '10px',
    padding: '1.3rem',
    height: "50vh",
    color: "rgb(182, 194, 207)",
  },
  h2:{
    width: '100%'
  },
  button:{
    alignSelf: 'flex-start'
  },
  descriptionCard: {
    overflowY: "scroll",
    height: "80%",
    width: '100%'
  },
  pokerCardsContainer: {
    display: "flex",
    alignContent: "center",
    gap: "10px",
  },
  pokerCard: {
    backgroundColor: "#f1f1f1",
    display: "flex",
    width: "50px",
    height: "80px",
    border: "solid 1px",
    borderRadius: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default pageStyles;
