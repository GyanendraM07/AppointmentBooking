const express = require('express');
const router = express.Router();
const adminService = require('../ControllerServices/AdminService');
const jwt = require('jsonwebtoken');

/**
 *
 * @author Gyanendra Mishra
 * @since November 30, 2023
 */

router.post('/createUser', async (req, res) => {
    try {
        const user = req.body;
        const response = await adminService.createUser(user);
        if (response.success) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ error: response.error });
        }
    } catch (error) {
        console.error('Error during User Creation :', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user route
router.post('/updateUser', async (req, res) => {
    try {
        const editUserData = req.body;
        const response = await adminService.updateUser(editUserData);
        if (response.success) {
            res.status(200).json({ status: 'success', message: response.message, companyList: response.companyList });
        } else {
            res.status(500).json({ error: response.error });
        }
    } catch (error) {
        console.error('Error during user update:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//User Function Acees 
router.post('/userFnAcces', async (req, res) => {
    const { menucheckedIds,selectedSubmenuIds, userId } = req.body;
    const response = await adminService.userFunctionAcces(menucheckedIds,selectedSubmenuIds, userId);
    if (response.success) {
        res.status(200).json({ status: 'success', message: response.message, companyList: response.companyList });
    } else {
        res.status(500).json({ error: response.error, message: ' User Function Access Failed !!' });
    }
})

router.post('/createRole', async (req, res) => {
    try {
        const role = req.body;
        const response = await adminService.createRole(role);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ error: response });
        }
    } catch (error) {
        console.error('Error during User Creation :', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateRole', async (req, res) => {
    try {
        const roleData = req.body;
        console.log('roleData', roleData);
        const response = await adminService.updateRole(roleData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error during user update:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//User Function Acees 
router.post('/roleFnAcces', async (req, res) => {
    try {
        const { menucheckedIds,selectedSubmenuIds, roleId } = req.body;
        const response = await adminService.roleFunctionAcces(menucheckedIds,selectedSubmenuIds,roleId);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    }
    catch (error) {
        console.error('Error during user update:', errormessage);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/createBranch', async (req, res) => {
    try {
        const branch = req.body;
        const response = await adminService.createBranch(branch);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ error: response });
        }
    } catch (error) {
        console.error('Error During Branch Creation :', error.message);
        res.status(500).json({ error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
});

router.post('/updateBranch', async (req, res) => {
    try {
        const branchData = req.body;
        const response = await adminService.updateBranch(branchData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error during Branch update:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
});



router.post('/createDept', async (req, res) => {
    try {
        const dept = req.body;
        const response = await adminService.createDepartment(dept);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ error: response });
        }
    } catch (error) {
        console.error('Error During Branch Creation :', error.message);
        res.status(500).json({ error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
});

router.post('/updateDept', async (req, res) => {
    try {
        const deptData = req.body;
        const response = await adminService.updateDepartment(deptData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error during Branch update:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
});

router.post('/createDoctor', async (req, res) => {
    try {
        const doctorData = req.body;
        const response = await adminService.createDoctor(doctorData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Doctor :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

router.post('/updateDoctor', async (req, res) => {
    try {
        const doctorData = req.body;
        const response = await adminService.updateDoctor(doctorData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Update Doctor :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

router.post('/createChannel', async (req, res) => {
    try {
        const channelData = req.body;
        const response = await adminService.createChannel(channelData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Channel :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/updateChannel', async (req, res) => {
    try {
        const channelData = req.body;
        const response = await adminService.updateChannel(channelData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Update Channel :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

router.post('/createSlot', async (req, res) => {
    try {
        const slotData = req.body;
        const response = await adminService.createSlot(slotData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Slot :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/createSlotConfig', async (req, res) => {
    try {
        const slotconfigData = req.body;
        const response = await adminService.createSlotConfig(slotconfigData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Slot Config :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.get('/getmenuSequence', async (req, res) => {
    try {
        const {companyId } = req.query;
        const response = await adminService.getMenuSequence(companyId);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }   
    } catch (error) {
        console.error('Error in Create Slot Config :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.get('/getsubMenuSequence', async (req, res) => {
    try {
        const { menuId,companyId } = req.query;
        const response = await adminService.getsubMenuSequence(menuId,companyId);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }   
    } catch (error) {
        console.error('Error in Create Slot Config :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/createMenuFn', async (req, res) => {
    try {
        const menuFnData = req.body;
        const response = await adminService.createMenuFunction(menuFnData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Menu Function :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/createSubmenuFn', async (req, res) => {
    try {
        const submenuFnData = req.body;
        const response = await adminService.createSubMenuFunction(submenuFnData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Menu Function :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }
})

router.post('/createPatientType', async (req, res) => {
    try {
        const patinetTypeData = req.body;
        const response = await adminService.createPatientType(patinetTypeData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Doctor :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

router.post('/updatePatientType', async (req, res) => {
    try {
        const updateptypeData = req.body;
        const response = await adminService.updatePatientType(updateptypeData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Doctor :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

router.post('/createUrl', async (req, res) => {
    try {
        const urlData = req.body;
        const response = await adminService.createManageUrl(urlData);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error('Error in Create Doctor :', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
    }

})

module.exports = router;