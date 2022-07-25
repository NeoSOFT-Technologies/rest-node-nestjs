export const apiResponse = {
  apiUserCreatedResponse: 'User has been created successfully',

  apiUserGetResponse: 'Users list returned successfully',

  apiUserGetById: 'User with specified Id returned successfully',

  apiUserUpdatedResponse: 'User with specified id updated successfully',

  apiUserDeletedResponse: 'User with specified id deleted successfully',

  apiCreateUserFirstNameProperty: {
    type: 'String',
    description: 'Firstname of the user',
  },

  apiCreateUserLastNameProperty: {
    type: 'String',
    description: 'Lastname of the user',
  },

  apiUpdateUserBoolProperty: {
    type: 'Boolean',
    description: 'Tells us whether user is active or not',
  },

  apiValidateUserEmail: {
    type: 'String',
    description: 'Email of the user',
  },

  apiValidateUserPass: {
    type: 'String',
    description: 'Password of the user',
  },
};
