const Healthcare = require("../models/Healthcare-Record");

function escapeRegex(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getSampleDocs() {
  return Healthcare.find(
    {}, 
    {
      billing_code_name: 1,
      reporting_entity_name_in_network_files: 1,
      provider_zip_code: 1,
    }
  )
  .limit(10)
  .lean();
}

exports.getCareOptions = async (req, res, next) => {
  res.set("Cache-Control", "no-store");

  try {
    const q     = req.query.search?.trim() || "";
    const lim   = parseInt(req.query.limit, 10) || 20;
    const regex = q ? new RegExp(escapeRegex(q), "i") : null;
    const filter = regex ? { billing_code_name: regex } : {};

    let values = await Healthcare.distinct("billing_code_name", filter);
    values = values
      .filter(v => v != null)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .slice(0, lim);

    return res.status(200).json({
      success: true,
      count:   values.length,
      data:    values,
    });
  } catch (err) {
    next(err);
  }
};

exports.getInsuranceOptions = async (req, res, next) => {
  res.set("Cache-Control", "no-store");
  try {
    const q     = req.query.search?.trim() || "";
    const lim   = parseInt(req.query.limit, 10) || 20;
    const regex = q ? new RegExp(escapeRegex(q), "i") : null;
    const filter = regex
      ? { reporting_entity_name_in_network_files: regex }
      : {};

    let values = await Healthcare.distinct(
      "reporting_entity_name_in_network_files",
      filter
    );
    values = values
      .filter(v => v != null)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .slice(0, lim);

    return res.status(200).json({ success: true, count: values.length, data: values });
  } catch (err) {
    next(err);
  }
};

exports.getZipCodes = async (req, res, next) => {
  res.set("Cache-Control", "no-store");
  try {
    const q = req.query.search;
    let filter = {};
    if (q) {
      const num = parseInt(q, 10);
      if (!isNaN(num)) filter.provider_zip_code = num;
    }

    let values = await Healthcare.distinct("provider_zip_code", filter);
    values = values
      .filter(v => v != null)
      .map(String)
      .sort((a, b) => a.localeCompare(b));

    return res.status(200).json({ success: true, count: values.length, data: values });
  } catch (err) {
    next(err);
  }
};

exports.getProviders = async (req, res, next) => {
  res.set("Cache-Control", "no-store");
  try {
    const {
      searchCare,
      zipCode,
      insurance,
      page = "1",
      limit = "10",
    } = req.query;

    const filter = {};
    if (searchCare) {
      filter.billing_code_name = new RegExp(escapeRegex(searchCare), "i");
    }
    if (zipCode) {
      const zip = parseInt(zipCode, 10);
      if (!isNaN(zip)) filter.provider_zip_code = zip;
    }
    if (insurance) {
      filter.reporting_entity_name_in_network_files = new RegExp(
        escapeRegex(insurance),
        "i"
      );
    }

    const pageNum = Math.max(parseInt(page, 10), 1);
    const limNum = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNum - 1) * limNum;

    const total = await Healthcare.countDocuments(filter);
    const docs = await Healthcare.find(filter)
      .skip(skip)
      .limit(limNum)
      .lean();

    return res.status(200).json({
      success: true,
      pagination: { total },
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};