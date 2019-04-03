const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WeatherSchema = new Schema({
    weather: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Weather', WeatherSchema);
