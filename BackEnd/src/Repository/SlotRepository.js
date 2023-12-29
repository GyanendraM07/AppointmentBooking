const slot = require('../Models/Slot'); // Adjust the path accordingly

class SlotRepository {
  // Add DAO functions here

  static async createSlot(slotData) {
    try {
      const newSlot = new slot(slotData);
      const result = await newSlot.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getSlotById(slotId) {
    try {
      const slot = await slot.findById(slotId);
      return slot;
    } catch (error) {
      throw error;
    }
  }

  // Add more CRUD operations as needed
}

module.exports = SlotRepository;
