module.exports = {
  fields : {
    id: {
      type: 'text'
    },
    displayName : 'text',
    facebookId: 'text'
  },
  key : [ 'id' ],
  indexes: [ 'facebookId' ]
};