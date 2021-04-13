/* jshint esversion: 6 */
  
(function() {
  'use strict';
  
  var _ = require("underscore");
  var models = require('express-cassandra');
  var shadyMessages = require('shady-messages').getInstance();
  
  var instance = null;
  
  var ORM = class {
  
    constructor (options) {
      models.setDirectory( __dirname + '/models').bind({
        clientOptions: {
          contactPoints: options.cassandraContactPoints,
          protocolOptions: options.cassandraProtocolOptions,
          keyspace: options.cassandraKeyspace,
          queryOptions: { consistency: models.consistencies.one }
        },
        ormOptions: {
          defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
          },
          dropTableOnSchemaChange: false,
          createKeyspace: true
        }
      }, function (err) {
        if (err) {
          console.error(err);
          shadyMessages.trigger("models:error", {
            err: err
          });
        } else {
          _.extend(module.exports, models.modelInstance);
          shadyMessages.trigger("models:ready");
        }
      }.bind(this));
      
      _.extend(this, models);
    }
    
  };
  
  module.exports = {
    getInstance: function () {
      if (!instance) {
        console.error("Instance not created, you should use createInstance before using this method");
      }
      
      return instance;
    },
  
    createInstance: function (options) {
      instance = new ORM(options);
    },
    
    model: function (name) {
      if (!instance) {
        console.error("Instance not created, you should use createInstance before using this method");
      }
      
      return instance.modelInstance[name];
    }
  };
  
}).call(this);