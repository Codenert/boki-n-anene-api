const CodeModel = require('../model/code_verifier')
const mongoose = require('mongoose')

exports.AddCode = (verificationCode, userId) => {

    return new CodeModel({
        _id: new mongoose.Types.ObjectId,
        code: verificationCode,
        user: userId
    }).save()

}

exports.GetCode = (id) => {
    return CodeModel.findOne({user: id}).exec()
}

exports.RemoveCode = (result) => {
    return CodeModel.findOneAndRemove({user: result}).exec()
}