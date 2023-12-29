// MenuConfig.js
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import OverviewIcon from '@mui/icons-material/Assessment';
import QuickViewIcon from '@mui/icons-material/Visibility';
import ChannelOverviewIcon from '@mui/icons-material/Tv';
import Login from './Login';
import Home from './Home';
import CreateModule from './superadmin/CreateModule';
import UserConfig from './superadmin/UserConfig';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code'; // Importing the Code icon
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import SettingsIcon from '@mui/icons-material/Settings';
import RoleConfig from './superadmin/RoleConfig';
import BranchConfig from './superadmin/BranchConfig';
import DepartmentConfig from './superadmin/DepartmentConfig';
import ChannelConfig from './superadmin/ChannelConfig';
import DoctorConfig from './superadmin/DoctorConfig';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import WelcomeAdmin from './superadmin/WelcomeAdmin';
import SlotConfig from './superadmin/SlotConfig';
import Demo from './userportal/Demo';
import Test from './userportal/Test';
import CompanyConfig from './superadmin/CompanyConfig';
import PatientTypeConfig from './superadmin/PatientTypeConfig';
import BusinessIcon from '@mui/icons-material/Business';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import LinkIcon from '@mui/icons-material/Link';
import UrlConfig from './superadmin/UrlConfig';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import DocAppointment from './userportal/DocAppointment';

// tum kya he likhoge 
// aur mai kya likhunga 
// Sununga kya 
// aur kya kahunga 
// kya gunaah kya galtiyaan 
// kyun maafi aur sajaye hai 
// meri zidngi tabaah hue 
// tera sawal raha hua kya 
// gunaho ki fahrish lagai tune 
// galtiyon ko mai saro pe sajaya 




export const iconMapping = {
  Home: <HomeIcon />,
  Overview: <OverviewIcon />,
  UserConfig: <PersonIcon />,
  CreateModule: <AccountTreeIcon />, // Using the AccountTree icon for CreateModule
  BranchConfig: <CodeIcon />, // Using the Code icon for CreateFunction
  ChannelOverview: <ChannelOverviewIcon />,
  RoleConfig:<SettingsIcon/>,
  DepartmentConfig: <DescriptionIcon />, // Add the icon for DepartmentConfig
  ChannelConfig: <ArticleIcon />, // Add the icon for ChannelConfig
  DoctorConfig: <LocalHospitalOutlinedIcon />,
  SlotConfig: <LocalHospitalOutlinedIcon />,
  Demo:<LocalHospitalOutlinedIcon />,
  Test:<DescriptionIcon />,
  Configuration:<SettingsIcon/>,
  CompanyConfig:<BusinessIcon />,
  PatientTypeConfig:<AccessibilityIcon/>,
  PatientTypeConfig:<AccessibilityIcon/>,
  CreateFunctions:<CreateIcon/>,
  UrlConfig:<LinkIcon/>,
  DocAppt:<LocalHospitalIcon />,
  DocAppointment:<EventIcon />,
};

  export const pageComponents = {
    Home: Home,
    login: Login,
    CreateModule: CreateModule,
    UserConfig: UserConfig,
    RoleConfig: RoleConfig,
    BranchConfig:BranchConfig,
    DepartmentConfig:DepartmentConfig,
    ChannelConfig:ChannelConfig,
    DoctorConfig:DoctorConfig,
    welcomeAdmin:WelcomeAdmin,
    SlotConfig:SlotConfig,
    Demo:Demo,
    Test:Test,
    CompanyConfig:CompanyConfig,
    PatientTypeConfig:PatientTypeConfig,
    UrlConfig:UrlConfig,
    DocAppointment:DocAppointment,
  };
