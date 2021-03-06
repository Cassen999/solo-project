
// Holds appointment slot info for scheduling
const ApptSlotReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_APT_SLOTS':
        return action.payload;
      case 'UNSET_APT_SLOTS':
        return [];
      case 'UPDATE_APT_SLOTS':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default ApptSlotReducer