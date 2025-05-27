const express = require("express");
const {
  getInsuranceOptions,
  getCareOptions,
  getZipCodes,
  getProviders,
  getEntityRecords,
} = require("../controllers/search.controller");
const router = express.Router();

router.get("/insurers", getInsuranceOptions);
router.get("/entities",      getCareOptions);
router.get("/zips",      getZipCodes);
router.get("/", getProviders);
router.get("/entity-records", getEntityRecords);


module.exports = router;
