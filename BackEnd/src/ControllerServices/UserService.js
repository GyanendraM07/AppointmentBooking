const userRepo = require('../Repository/UserRepository');
const companyRepo = require('../Repository/CompanyRepository');
const manageUrlRepo = require('../Repository/ManageUrlRepository');
const cryptoUtil = require('../security/cryptoUtils');
const jwt = require('jsonwebtoken');

class UserService {

    static async authLogin(email, pass) {
        try {
            const user = await userRepo.findUserByEmail(email);
            if (!user)
                return { status: 404, message: 'User Not Found' };
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecretKey, { expiresIn: '1h' });
            if (cryptoUtil.comparePasswords(pass, user.password)) {
                if (user.navIndicator === 2) {// means User is ClientUser or Admin of Client System 
                    const user_User = await userRepo.getuserByIdforUserDash(user.id);
                    //return mutableQueryResult;
                    return { status: 200, message: 'Login Succesfull ', data: { userData: user_User, token: token } };
                } else {// user is SuperAdmin 
                    const user_admin = await userRepo.getUserById(user.id);
                    let mutableQueryResult = user_admin._doc    // _doc property holds the mutable object
                    delete mutableQueryResult.password;
                    delete mutableQueryResult.__v;
                    // return mutableQueryResult;
                    const companyList = await companyRepo.getAllCompanies();
                    //res.status(200).json({ status: 'Login Succesfull', data: { userData: user, companyList: companyList, token: token } });
                    return { status: 200, message: 'Login Succesfull ', data: { userData: mutableQueryResult, companyList: companyList, token: token } };
                }
            }
            else {
                return { status: 401, message: 'Invalid  Credential' };
            }
        } catch (error) {
            console.error('Error in  Login User   :', error.message);
            return { status: false, message: error.message };
        }
    }

    static async getTokenAndurlData(urlKey) {
        try {
            const urlDetails = await manageUrlRepo.getManageUrlByurlName(urlKey);
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({}, jwtSecretKey, { expiresIn: '10m' });
            return { status: 200, message: 'Token and UrlDetails Succesfull ', data: { urlDetails: urlDetails, token: token } };
        } catch (error) {
            console.error('Error in Token And Url Details   :', error.message);
            return { status: false, message: error.message };
        }
    }
    static async getCompnyList() {
        const companyList = companyRepo.getAllCompanies();
        return companyList;
    }
}


module.exports = UserService;