export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "CARDS_TO_ESTIMATE":
      return {
        ...state,
        cardsToEstimate: payload,
      };
    case "SELECTED_CARD_TO_ESTIMATE":
      return {
        ...state,
        selectedCardToEstimate: payload,
      };
    case "ORIGIN_LIST":
      return {
        ...state,
        originList: payload,
      };
    case "DESTINATION_LIST":
      return {
        ...state,
        destinationList: payload,
      };
    case "ROLE_SELECTED": 
      return{
        ...state,
        roleSelected: payload
      }
    default:
      return state;
  }
};
