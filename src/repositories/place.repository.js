import Place from '../models/place.js'; 

class PlaceRepository{

    async create(placeData) {
        return await Place.create(placeData);
    }

    async findAll(category){
        const filter = {
            isActive: true
        }; 

        if(category){
            filter.category = category; 
        }
        return await Place.find(filter).sort({ createdAt: -1 });

    }

    async findById(id){
        return await Place.findById(id); 
    }

    async update(id, updateData){
        return await Place.findByIdAndUpdate(id, updateData, {new: true});
    }

    
}

export default new PlaceRepository(); 