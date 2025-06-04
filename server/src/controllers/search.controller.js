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
    const q = req.query.search?.trim() || "";
    const lim = parseInt(req.query.limit, 10) || 20;
    const regex = q ? new RegExp(escapeRegex(q), "i") : null;
    const filter = regex ? { billing_code_name: regex } : {};

    let values = await Healthcare.distinct("billing_code_name", filter);
    values = values
      .filter((v) => v != null)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .slice(0, lim);

    return res.status(200).json({
      success: true,
      count: values.length,
      data: values,
    });
  } catch (err) {
    next(err);
  }
};

exports.getInsuranceOptions = async (req, res, next) => {
  res.set("Cache-Control", "no-store");
  try {
    const searchCare = req.query.searchCare?.trim() || "";
    const zipCode = req.query.zipCode?.trim();
    const lim = parseInt(req.query.limit, 10) || 20;
    
    const filter = {};
    
    if (searchCare) {
      filter.billing_code_name = new RegExp(escapeRegex(searchCare), "i");
    }
    
    if (zipCode) {
      const zip = parseInt(zipCode, 10);
      if (!isNaN(zip)) {
        const firstDigit = Math.floor(zip / 1000);
        const lower = firstDigit * 1000;
        const upper = lower + 999;
        filter.provider_zip_code = { $gte: lower, $lte: upper };
      }
    }

    let values = await Healthcare.distinct(
      "reporting_entity_name_in_network_files",
      filter
    );
    values = values
      .filter((v) => v != null)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .slice(0, lim);

    return res
      .status(200)
      .json({ success: true, count: values.length, data: values });
  } catch (err) {
    next(err);
  }
};

exports.getZipCodes = async (req, res, next) => {
  res.set("Cache-Control", "no-store");
  try {
    let entity = req.query.entity;
    if (!entity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required `entity` param" });
    }
    entity = entity.trim();
    const exactMatch = new RegExp(`^${escapeRegex(entity)}$`, "i");
    const filter = { billing_code_name: exactMatch };
    let values = await Healthcare.distinct("provider_zip_code", filter);

    values = values
      .filter((v) => v != null)
      .map(String)
      .sort((a, b) => a.localeCompare(b));
    return res
      .status(200)
      .json({ success: true, count: values.length, data: values });
  } catch (err) {
    next(err);
  }
};

// controllers/providersController.js
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
      if (!isNaN(zip)) {
        const firstDigit = Math.floor(zip / 1000);
        const lower = firstDigit * 1000;
        const upper = lower + 999;
        filter.provider_zip_code = { $gte: lower, $lte: upper };
      }
    }
    console.log("for insurance",filter.provider_zip_code)
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
    const docs = await Healthcare.find(filter).skip(skip).limit(limNum).lean();
    console.log("for insurance",docs)
    return res.status(200).json({
      success: true,
      pagination: { total },
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};


exports.getEntityRecords = async (req, res, next) => {
  res.set("Cache-Control", "no-store");

  try {
    const entity = (req.query.entity || "").trim();
    if (!entity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required `entity` param" });
    }

    const entityRegex = new RegExp(`^${escapeRegex(entity)}$`, "i");
    const filter = { reporting_entity_name_in_network_files: entityRegex };

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 100, 1);
    const skip = (page - 1) * limit;

    const [total, docs] = await Promise.all([
      Healthcare.countDocuments(filter),
      Healthcare.find(filter).skip(skip).limit(limit).lean(),
    ]);

    return res.status(200).json({
      success: true,
      pagination: { total, page, limit },
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecordBySingleCare = async (req, res, next) => {
  res.set("Cache-Control", "no-store");

  try {
    const searchCare = (req.query.searchCare || "").trim();
    if (!searchCare) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required `searchCare` param" });
    }

    const billingCodeRegex = new RegExp(escapeRegex(searchCare), "i");
    const filter = { billing_code_name: billingCodeRegex };

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 100, 1);
    const skip = (page - 1) * limit;

    const [total, docs] = await Promise.all([
      Healthcare.countDocuments(filter),
      Healthcare.find(filter)
        .select({
          billing_code_name: 1,
          reporting_entity_name_in_network_files: 1,
          provider_zip_code: 1,
          negotiated_rate: 1,
          provider_name: 1,
          provider_address: 1,
          provider_city: 1,
          provider_state: 1,
          billing_code_type:1,
          _id: 0
        })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      pagination: { total, page, limit },
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecordBySingleCareById = async (req, res, next) => {
  res.set("Cache-Control", "no-store");

  try {
    const Id = (req.query.Id || "").trim();
    if (!Id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required `id` param" });
    }

    const filter = { _id: Id };
    const docs = await Healthcare.find(filter)
      .select({
        billing_code_name: 1,
        reporting_entity_name_in_network_files: 1,
        provider_zip_code: 1,
        negotiated_rate: 1,
        provider_name: 1,
        provider_address: 1,
        provider_city: 1,
        provider_state: 1,
        billing_code_type: 1,
        "Description of Service":1,
        _id: 0
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};

