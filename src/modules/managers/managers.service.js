import managerModel from "./managers.model.js";

const createManager = async (body) => {
  return await managerModel.createManager(body);
};

const getManagers = async () => {
  return await managerModel.getManagers();
};

const getSingleManager = async (id) => {
  return await managerModel.getSingleManager(id);
};

const updateManager = async (id, body) => {
  return await managerModel.updateManager(id, body);
};

const deleteManager = async (id) => {
  return await managerModel.deleteManager(id);
};

export default {
  createManager,
  getManagers,
  getSingleManager,
  updateManager,
  deleteManager,
};
