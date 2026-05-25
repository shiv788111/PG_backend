import userBranchModel from "./userBranches.model.js";

const assignUserBranch = async (body) => {
  const { user_id, branch_id } = body;

  return await userBranchModel.assignUserBranch(user_id, branch_id);
};

const getAllUserBranches = async () => {
  return await userBranchModel.getAllUserBranches();
};

const getUserBranches = async (user_id) => {
  return await userBranchModel.getUserBranches(user_id);
};

const deleteUserBranch = async (id) => {
  return await userBranchModel.deleteUserBranch(id);
};

export default {
  assignUserBranch,
  getAllUserBranches,
  getUserBranches,
  deleteUserBranch,
};
