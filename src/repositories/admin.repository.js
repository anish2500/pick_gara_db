import Admin from "../models/admin.js";

class AdminRepository{
    async create(adminData){
        return await Admin.create(adminData);
    }

    async findByEmail(email){
        return await Admin.findOne({email});
    }

    async findById(id){
        return await Admin.findById(id);
    }

}

export default new AdminRepository();


