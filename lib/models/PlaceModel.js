module.exports = {
  fields : {
    id: {
      type: 'text'
    },
    name : 'text',
    description: 'text',
    tags: {
      type: "list",
      typeDef: "<text>"
    },
    categories: {
      type: "list",
      typeDef: "<text>"
    },
    url: 'text',
    priceLevel: 'text',
    priceMessage: 'text',
    latitude: 'double',
    longitude: 'double',
    accurate: 'boolean',
    streetAddress: 'text',
    crossStreet: 'text',
    city: 'text',
    state: 'text',
    postalCode: 'text',
    country: 'text'
  },
  key : [ 'id' ]
};
