const UserRoleService = require("../services/UserRoleService");
const CONSTANTS_CONFIG = require("../config/constants-config");

const userRoleService = new UserRoleService();

module.exports = {
  getUserPermissionByRoleId: async (request, response) => {
    console.log("[ UserRoleController getUserPermissionByRoleId() ] is called");
    try {
      const rolePermission = await userRoleService.getUserPermissionByRoleId(request);
      console.log("[ UserRoleController getUserPermissionByRoleId() ] returned result : ", rolePermission);
      response.status(rolePermission.statusCode || 200).json(rolePermission.content);
    } catch (ex) {
      console.log("Error while listing getUserPermissionByRoleId().", ex);
      response.status(500).send({
        message: CONSTANTS_CONFIG.MAPPER.USER_ROLE_PERMISSION.USR_ROLE_PERMISSION_NOT_FOUND,
      });
    }
  },
  getUserPermissions: async (request, response) => {
    console.log("[ UserRoleController getUserPermissions() ] is called");
    try {
      const rolePermission = await userRoleService.getUserPermissions(request);
      console.log("[ UserRoleController getUserPermissions() ] returned result : ", rolePermission);
      response.status(rolePermission.statusCode || 200).json(rolePermission.content);
    } catch (ex) {
      console.log("Error while listing getUserPermissions().", ex);
      response.status(500).send({
        message: CONSTANTS_CONFIG.MAPPER.USER_ROLE_PERMISSION.USR_ROLE_PERMISSION_NOT_FOUND,
      });
    }
  },
};
