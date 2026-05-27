import {
  createAmenityService,
  getAmenitiesService,
  getAmenityByIdService,
  updateAmenityService,
  deleteAmenityService,
  assignRoomAmenityService,
  getRoomAmenitiesService,
} from "./amenities.service.js";

// CREATE
export const createAmenity = async (req, res) => {
  try {
    const result = await createAmenityService(req.body);

    res.status(201).json({
      success: true,
      message: "Amenity created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAmenities = async (req, res) => {
  try {
    const result = await getAmenitiesService();

    res.status(200).json({
      success: true,
      message: "Amenities fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getAmenityById = async (req, res) => {
  try {
    const result = await getAmenityByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Amenity fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateAmenity = async (req, res) => {
  try {
    const result = await updateAmenityService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Amenity updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteAmenity = async (req, res) => {
  try {
    await deleteAmenityService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Amenity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ASSIGN ROOM AMENITY
export const assignRoomAmenity = async (req, res) => {
  try {
    const { room_id, amenity_ids } = req.body;

    // VALIDATION

    if (!room_id || !amenity_ids || amenity_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Room ID and amenity IDs are required",
      });
    }

    const result = await assignRoomAmenityService(req.body);

    res.status(201).json({
      success: true,
      message: "Room amenities assigned successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ROOM AMENITIES
export const getRoomAmenities = async (req, res) => {
  try {
    const result = await getRoomAmenitiesService(req.params.room_id);

    res.status(200).json({
      success: true,
      message: "Room amenities fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
