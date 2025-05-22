const express = require("express");
const {
  getInsuranceOptions,
  getCareOptions,
  getZipCodes,
  getProviders,
} = require("../controllers/search.controller");
const router = express.Router();

router.get("/insurers", getInsuranceOptions);
router.get("/entities",      getCareOptions);
router.get("/zips",      getZipCodes);
router.get("/", getProviders);


module.exports = router;
