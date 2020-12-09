
const Joi = require('joi')
const { chainSchema } = require('./chain.schema')
const { identitySchema } = require('./identity.schema')
const { sworkerSchema } = require('./sworker.schema')
const { nodeSchema } = require('./node.schema')

function getConfigSchema(config) {
  let sMap = {
    node: nodeSchema.required(),
    chain: chainSchema.required(),
  }

  if (config.node.sworker == "enable") {
    sMap["api"] = Joi.object().default()
    sMap["identity"] = identitySchema.required()
    sMap["sworker"] = Joi.object().default()
  }

  if (config.node.smanager == "enable") {
    sMap["smanager"] = Joi.object().default()
  }

  if (config.node.ipfs == "enable") {
    sMap["ipfs"] = Joi.object().default()
  }

  return Joi.object(sMap)
}

module.exports = {
  getConfigSchema,
}
