import { RoleRequest } from "../model/RoleRequest.js";
import { User } from "../model/user.js";

// User sends request
export const createEducatorRequest = async (req, res) => {
  try {
    const userId = req.user._id;

    const existing = await RoleRequest.findOne({ user: userId, status: "pending" });
    if (existing) return res.status(400).json({ message: "Request already sent" });

    const request = await RoleRequest.create({ user: userId });
    res.status(201).json({ message: "Request sent to admin", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin fetches all pending requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await RoleRequest.find({ status: "pending" })
      .populate("user", "fullName email role");
    res.status(200).json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve request
export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await RoleRequest.findById(requestId).populate("user");
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Request already processed" });

    // Update user role
    request.user.role = "educator";
    await request.user.save();

    request.status = "approved";
    await request.save();

    res.status(200).json({ message: `${request.user.fullName} is now an educator` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await RoleRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Request already processed" });

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};