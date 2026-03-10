import express from "express";
import Business from "../../models/Business.js";
import Product from "../../models/Product.js";
import isFounder from "../../middleware/isFounder.js";

const router = express.Router();

/**
 * GET /api/superadmin/businesses
 * Returns a paginated, searchable list of all businesses with their product counts.
 */
router.get("/", isFounder, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Business.countDocuments(query);
    
    // Get businesses
    const businesses = await Business.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Attach product counts to each business
    // (In a real massive DB, we would cache this or use a $lookup aggregation, 
    // but for pagination limit=20, this is very fast)
    const businessIds = businesses.map(b => b._id);
    
    const productCounts = await Product.aggregate([
      { $match: { businessId: { $in: businessIds } } },
      { $group: { _id: "$businessId", count: { $sum: 1 } } }
    ]);

    const countMap = {};
    for (const pc of productCounts) countMap[pc._id.toString()] = pc.count;

    const data = businesses.map(b => ({
      ...b,
      productCount: countMap[b._id.toString()] || 0
    }));

    res.json({
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    console.error("Superadmin Businesses Error:", err.message);
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});

export default router;
