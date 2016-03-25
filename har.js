/**
 * Created by root on 3/22/16.
 */
var _ = require('lodash');

var onGoingHar = {};

module.exports = {
    resetHar: function () {
        onGoingHar = {}
    },
    appendToHar: function (harPiece) {
        _.extend(onGoingHar, harPiece);
    },
    getHar: function () {
        return onGoingHar
    }
};
