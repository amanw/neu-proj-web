const express = require('express');
const router = express.Router();
const Auditplan = require('../models/auditplan');

router.get('', function(req, res) {
    Auditplan.find({}, function(err, foundAuditPlans) {
        res.json(foundAuditPlans);
    })
});

module.exports = router;