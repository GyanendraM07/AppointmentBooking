const express = require('express');
const router = express.Router();
const companyRepo = require('../Repository/CompanyRepository');
const branchRepo = require('../Repository/BranchRepository'); 
const channelRepo = require('../Repository/ChannelRepository'); 
const typeRepo = require('../Repository/TypeRepository'); 
const functionMasterRepo = require('../Repository/MenuFunctionMasterRepository'); 
const departmentRepo = require('../Repository/DepartmentRepository'); 
const roleRepo = require('../Repository/RoleRepository'); 
const userRepo = require('../Repository/UserRepository');
const DoctorDAO = require('../Repository/DoctorRepository');
const cryptoUtil = require('../security/cryptoUtils'); 
const jwt = require('jsonwebtoken'); 
const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
require('dotenv').config();


// Fake endpoint to create a new company with hardcoded dummy data
router.get('/cmp', async (req, res) => {
    try {
      // Hardcoded dummy data
      // const dummyCompanyData = {
      //   name: 'Tech Harbours',
      //   shortName: 'TH',
      //   domainName: 'techharbours.com',
      //   smtpPort: 587,
      //   smtpEmail: 'th@techharbours.com',
      //   smtpPassword: 'thP@ss2014',
      //   contactNo: '9625528778',
      //   createdBy: 'system admin',
      //   userName: 'Tech Harbours',
      //   email: 'th@hospital.com',
      //   password: 'P@ss2014',
      //   activationDate: new Date(),
      //   // Add other fields as needed
      // };
  

        const dummyCompanyData = {
        name: 'River',
        shortName: 'RV',
        domainName: 'river.com',
        smtpPort: 585,
        smtpEmail: 'support@river.com',
        smtpPassword: 'riverP@ss2014',
        contactNo: '9625528778',
        createdBy: '657e2996546698ba11c2ac66',
        userName: 'River',
        email: 'river@hospital.com',
        password: 'P@ss2014',
      };
      // Create a new company using the hardcoded dummy data
      const newCompany = await companyRepo.createCompany(dummyCompanyData);
      
      res.json(newCompany);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Fake endpoint to create a new branch with dummy data
  router.get('/branches', async (req, res) => {
    try {
      // Hardcoded dummy data for the branch
      const dummyBranchData = {
        name: 'Dummy Branch',
        shortName: 'DB',
        createdBy: 'admin',
        companyId: '123456', // Replace with a valid company ID
        isActive: 1, // Change if needed
      };
  
      // Create a new branch using the hardcoded dummy data
      const newBranch = await branchRepo.createBranch(dummyBranchData);
      
      res.json(newBranch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Fake endpoint to create a new channel with dummy data
  router.get('/channels', async (req, res) => {
    try {
      // Hardcoded dummy data for the channel
      const dummyChannelData = {
        name: 'Dummy Channel',
        shortName: 'DC',
        createdBy: 'admin',
        companyId: '123456', // Replace with a valid company ID
        isActive: 1, // Change if needed
      };
  
      // Create a new channel using the hardcoded dummy data
      const newChannel = await channelRepo.createChannel(dummyChannelData);
      
      res.json(newChannel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
// Fake endpoint to create a new type with dummy data
router.get('/types', async (req, res) => {
    try {
      // Hardcoded dummy data for the type
      const dummyTypeData = {
        name: 'Dummy Type',
        shortName: 'DT',
        createdBy: 'admin',
        companyId: '123456', // Replace with a valid company ID
        isActive: 1, // Change if needed
      };
  
      // Create a new type using the hardcoded dummy data
      const newType = await typeRepo.createType(dummyTypeData);
      
      res.json(newType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Fake endpoint to create a new functionMaster with dummy data
  router.get('/functionMasters', async (req, res) => {
    try {
      // Hardcoded dummy data for the functionMaster
      const dummyFunctionMasterData = {
        headerName: ' Create Module',
        routeModuleName: 'CreateModule',
        description: 'This Module will Responsible to create Module menuItems  And sub menuItems ',
        menuIndicator: 1,
        sequence: 1,
        createdBy: '657e2996546698ba11c2ac66',
        isActive: 1, // Change if needed
      };
      // Create a new functionMaster using the hardcoded dummy data
      const newFunctionMaster = await functionMasterRepo.createMenuFunctionMaster(dummyFunctionMasterData);
      res.json(newFunctionMaster);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  const mongoose = require('mongoose');
   // Fake endpoint to create a new User with dummy data
  router.get('/userSave', async (req, res) => {
    try {
      // Hardcoded dummy data for the functionMaster
      const dummyUserData = {
        userName: 'Super Admin',
        email: 'superadmin@th.com',
        password: cryptoUtil.encrypt('P@ss2014'),
        levelId: 0,
        createdBy: 'superadmin',
        navIndicator:'1',
        companyId:'657b5090346cc8d5eef1d884',
        isActive:'1',
        funConfigList: [
          {
            menuId: '657b76d61363b46e02cbe3e0', // Replace with a valid menu ID
            subMenuIds: ['657cd143af240172a76e6fc7', '657cfec6af169c25490793f4'], // Replace with valid submenu IDs
          },
        ],
    };
      // Create a new functionMaster using the hardcoded dummy data
      const newFunctionMaster = await userRepo.createUser(dummyUserData);
      res.json(newFunctionMaster);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

     // Fake endpoint to create a new User with dummy data
     router.get('/userRandFn', async (req, res) => {
      try {
        // Create a new functionMaster using the hardcoded dummy data
        const newFunctionMaster = await userRepo.getUserById("65610d6bfef712f5ff01ab28");
        if (!newFunctionMaster) {
          return res.status(404).json({ error: 'Company not found' });
        }
    
        // Get the specific channel and branch IDs
        const roleConfigListToadd = [ '6560fe83eebcfaf508398cc4']; // Replace with your specific channel IDs
        const funConfigListToadd = ['656112641e0067fc9f5d9c4b', '6561129e97825077ece8a6d2']; // Replace with your specific branch IDs
    
        // Add the channel and branch IDs to the existing Company
        newFunctionMaster.roleConfigList = newFunctionMaster.roleConfigList.concat(roleConfigListToadd);
        newFunctionMaster.funConfigList = newFunctionMaster.funConfigList.concat(funConfigListToadd);
        // Save the updated Company
        const updatedCompany = await newFunctionMaster.save();
        res.json(newFunctionMaster);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

      // API endpoint to fetch Company by ID with populated channel and branch data
  router.get('/userFn', async (req, res) => {
    try {
  
      // Fetch the Company by ID and populate the channelList and branchList
      const company = await userRepo.getCompanyByIdToPopulate('65610d6bfef712f5ff01ab28');
     
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
        
      }
  
      res.json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Fake endpoint to create a new department with dummy data
router.get('/departments', async (req, res) => {
    try {
      // Hardcoded dummy data for the department
      const dummyDepartmentData = {
        name: 'Dummy Department',
        shortName: 'DD',
        createdBy: 'admin',
        companyId: '123456', // Replace with a valid company ID
        branchId: '789012', // Replace with a valid branch ID
        isActive: 1, // Change if needed
      };
  
      // Create a new department using the hardcoded dummy data
      const newDepartment = await departmentRepo.createDepartment(dummyDepartmentData);
      
      res.json(newDepartment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
// API endpoint to associate Channel and Branch with an existing Company
router.get('/associateChannelBranchWithCompany', async (req, res) => {
    try {
  
      // Fetch the existing Company by its ID
      const existingCompany = await companyRepo.getCompanyById('655e06d792292d347d51fdcf');
  
      if (!existingCompany) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      // Get the specific channel and branch IDs
      const channelIdsToAdd = ['655e162aadc6a6a0eb47ffd5', '655e1ff3adc6a6a0eb47ffdd']; // Replace with your specific channel IDs
      const branchIdsToAdd = ['655e161fadc6a6a0eb47ffd3', '655e2000adc6a6a0eb47ffe1']; // Replace with your specific branch IDs
  
      // Add the channel and branch IDs to the existing Company
      existingCompany.channelList = existingCompany.channelList.concat(channelIdsToAdd);
      existingCompany.branchList = existingCompany.branchList.concat(branchIdsToAdd);
  
      // Save the updated Company
      const updatedCompany = await existingCompany.save();
  
      res.json(updatedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // API endpoint to fetch Company by ID with populated channel and branch data
  router.get('/getx', async (req, res) => {
    try {
  
      // Fetch the Company by ID and populate the channelList and branchList
      const company = await companyRepo.getCompanyByIdToPopulate('655e06d792292d347d51fdcf');
     
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
        
      }
  
      res.json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/encrypt', (req, res) => {
    const encrypted = cryptoUtil.encrypt("Gyanendra");
    res.json({ encrypted });
});

router.get('/decrypt', (req, res) => {
    const decrypted = cryptoUtil.decrypt("c6ee8bad8d731345e092266c39cdb452ed5dd79dea85169eb037ddf7c1fbf128c452f9f1a8024621a095ea424ecc36c72d29dbfacedf765ef52ae13f3fc65aa8");
    res.json({ decrypted });
});


// Generating JWT 
router.get("/generateToken", (req, res) => { 
  // Validate User Here 
  // Then generate JWT Token 

  let jwtSecretKey = process.env.JWT_SECRET_KEY; 
  let data = { 
      userId: 12, 
  } 

  const token = jwt.sign(data, jwtSecretKey); 

  res.send(token); 
}); 

// Verification of JWT 
router.get("/validateToken", (req, res) => { 
  // Tokens are generally passed in header of request 
  // Due to security reasons. 

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 
  let jwtSecretKey = process.env.JWT_SECRET_KEY; 

  try { 
      //const token = req.header(tokenHeaderKey); 
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AdGguY29tIiwiaWF0IjoxNzAxMzQwNjU0LCJleHAiOjE3MDEzNDQyNTR9.x2kfX6QFgoSd7vgAxqUJyCkC9XWYfiY-lSmT9ZV-pr4";

      const verified = jwt.verify(token, jwtSecretKey); 
      if(verified){ 
          return res.send("Successfully Verified"); 
      }else{ 
          // Access Denied 
          return res.status(401).send(error); 
      } 
  } catch (error) { 
      // Access Denied 
      return res.status(401).send(error); 
  } 
});

// Fake endpoint to create a new role with hardcoded dummy data
router.get('/roles', async (req, res) => {
  try {
    // Hardcoded dummy data for the role
    const dummyRoleData = {
      name: 'Hospital User',
      shortName: 'HOU',
      createdBy: '65610d6bfef712f5ff01ab28',
      roleId:3,
      isActive: 1,
    };

    // Create a new role using the hardcoded dummy data
    const newRole = await roleRepo.createRole(dummyRoleData);

    res.json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/doctor', async (req, res) => {
  try {
    const newDoctor = await DoctorDAO.createDoctor({
      name: 'John Doe',
      shortName: 'JD',
      createdBy: 'Admin',
      companyId: '123',
      deptId: '456',
      branchId: '789',
    });
    res.json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

router.get('/checkUUId', async (req, res) => {
  // const uuid = uuidv4();
  // const fourDigitUniqueId = parseInt(uuid.substring(0, 4), 16);

  // res.json({ uniqueNumber: fourDigitUniqueId,uuid:uuid });
  const uniqueId = shortid.generate();
  res.json({ uniqueId: uniqueId });
});
  module.exports = router;
  