export const handleRegisterFulfilled = (state, { payload }) => {
  state.user = payload.user;
};
