import axios from 'axios';


export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:4000/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUserApi = async (userData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createUser', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserDetails = async (userData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateUser', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userFunctionAccess = async (menucheckedIds, selectedSubmenuIds, userId, token) => {
  try {
    const userData = {
      menucheckedIds: menucheckedIds,
      selectedSubmenuIds: selectedSubmenuIds,
      userId: userId,
    };
    const response = await axios.post('http://localhost:4000/admin/userFnAcces', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const createRoleApi = async (roleData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createRole', roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateRole = async (roleData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateRole', roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const roleFunctionAccess = async (menucheckedIds, selectedSubmenuIds, roleId, token) => {
  try {
    const roleData = {
      menucheckedIds: menucheckedIds,
      selectedSubmenuIds: selectedSubmenuIds,
      roleId: roleId,
    };
    const response = await axios.post('http://localhost:4000/admin/roleFnAcces', roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const createBranchApi = async (branchData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createBranch', branchData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBranch = async (branchData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateBranch', branchData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createDepartmentApi = async (deptData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createDept', deptData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateDepartment = async (deptData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateDept', deptData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createDoctorApi = async (doctorData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createDoctor', doctorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateDoctor = async (doctorData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateDoctor', doctorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createChannelApi = async (channelData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createChannel', channelData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateChannel = async (channelData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updateChannel', channelData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDeparmentList = async (companyId, branchId, token) => {
  try {
    const response = await axios.get('http://localhost:4000/apt/getDeptList', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        companyId: companyId,
        branchId: branchId,
      },
    });
    return response.data;

  } catch (error) {
    throw error.response.data;
  }
};

export const getSlotsList = async (companyId, branchId, departmentId, doctorId, dayOfWeek, dayOfMonth, token) => {
  try {
    const response = await axios.get('http://localhost:4000/apt/getslotList', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        companyId: companyId,
        branchId: branchId,
        departmentId: departmentId,
        doctorId: doctorId,
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
      },
    });
    return response.data;

  } catch (error) {
    throw error.response.data;
  }
};

export const getTokenAndDataforApt = async (urlKey) => {
  try {
    const response = await axios.get('http://localhost:4000/user/getTokenAndData', {
      params: {
        urlKey: urlKey,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createSlotApi = async (slotData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createSlot', slotData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createSlotConfigApi = async (slotConfigData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createSlotConfig', slotConfigData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



export const getSequenceNumber = async (selectedCompanyId, token) => {
  try {
    const response = await axios.get('http://localhost:4000/admin/getmenuSequence', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        companyId: selectedCompanyId,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubMenuSequenceNumber = async (menuId, selectedCompanyId, token) => {
  try {
    const response = await axios.get('http://localhost:4000/admin/getsubMenuSequence', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        menuId: menuId,
        companyId: selectedCompanyId,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createMenuFunction = async (menuFnData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createMenuFn', menuFnData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createSubMenuFunction = async (menusubFnData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createSubmenuFn', menusubFnData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const createPatientTypeApi = async (patientTypeData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createPatientType', patientTypeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatedPatientType = async (patientTypeData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/updatePatientType', patientTypeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUrlApi = async (urlData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/admin/createUrl', urlData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const generateOTP = async (patinetData,token) => {
  try {
    const response = await axios.post('http://localhost:4000/apt/generateOTP', patinetData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const bookAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post('http://localhost:4000/apt/createAppt', appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};