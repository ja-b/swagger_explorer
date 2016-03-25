/**
 * Created by root on 3/22/16.
 */
var toggleActive = false;
var domainFilter = '';
var specTarget = '';

module.exports = {
    getToggleActive: function () {
        return toggleActive
    },
    getDomainFilter: function () {
        return domainFilter
    },
    getSpecTarget: function () {
        return specTarget
    },
    setToggleActive: function (active) {
        toggleActive = active
    },
    setDomainFilter: function (filter) {
        domainFilter = filter
    },
    setSpecTarget: function (target) {
        specTarget = target
    }
};
