import { createMachine,assign } from "xstate";

// Form machine definition
const formMachine = createMachine({
  id: 'form',
  initial: 'userInfo',
  context: {
    FirstName: '',
    LastName: '',
    email: '',
    survey: '',
  },
  states: {
    userInfo: {
      on: {
        NEXT: {
          target: 'survey',
          actions: assign({
            FirstName: (_, event) => event.data.FirstName,
            LastName: (_, event) => event.data.LastName,
            email: (_, event) => event.data.email,
          }),
        },
      },
    },
    survey: {
      on: {
        UPDATE_ANSWER: {
          target: 'confirmation',
          actions: assign({
            survey: (context, event) => {
              const updatedSurvey = { ...event.data };
            return updatedSurvey;
            },
          }),
        },
        PREVIOUS: 'userInfo',

      },
    },
    confirmation: {
      on: {
        PREVIOUS: 'survey',
      },
    },
  },
});

export default formMachine;
