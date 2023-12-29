const Channel = require('../Models/Channel'); // Update the path based on your project structure

class ChannelRepository {
  static async createChannel(channelData) {
    try {
      const channel = new Channel(channelData);
      return await channel.save();
    } catch (error) {
      throw error;
    }
  }

  static async getChannelById(channelId) {
    try {
      return await Channel.findById(channelId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllChannels() {
    try {
      return await Channel.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  // Add other CRUD methods as needed
}

module.exports = ChannelRepository;
