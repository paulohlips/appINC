export const Types = {
 GET_STATE_FORM: 'new/GET_STATE_FORM',
};

const InitialState = {
  data: [],
  erro: null,
  load: false,
  sucsses: false,
  form: 'sjahdjkashdkashd',
  formRef: null, 
};


export default function newState(state = InitialState, action) {
  switch (action.type) {
    case Types.GET_STATE_FORM:
      return { ...state, formRef: action.payload.form}
    default:
      return state;
  }
}

export const Creators ={
  getStateForm: form => ({
    type: Types.GET_STATE_FORM,
    payload: { form },
  }),  
};
