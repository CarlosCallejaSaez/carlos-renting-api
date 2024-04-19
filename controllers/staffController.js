const multerConfig = require("../config/multerConfig");
const cloudinary = require("../config/cloudinaryConfig");
const Staff = require('../models/Staff');

async function createStaff(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const staff = new Staff({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await staff.save();
    res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating staff" });
  }
}

async function getStaff(req, res) {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error getting staff" });
  }
}

async function deleteStaff(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);

    await cloudinary.uploader.destroy(staff.cloudinary_id);

    await staff.deleteOne({ _id: req.params.id });

    res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error deleting staff" });
  }
}

async function updateStaff(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);

    await cloudinary.uploader.destroy(staff.cloudinary_id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      name: req.body.name || staff.name,
      avatar: result?.secure_url || staff.avatar,
      cloudinary_id: result?.public_id || staff.cloudinary_id,
    };

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(updatedStaff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating staff" });
  }
}

async function getStaffById(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);
    res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error getting staff by ID" });
  }
}

module.exports = {
  createStaff,
  getStaff,
  deleteStaff,
  updateStaff,
  getStaffById
};
