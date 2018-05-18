var mongoose = require('mongoose');

var PieceSchema = new mongoose.Schema({
  opus: String,
  title: String,
  composer: String,
  key: String,
  category: String,
  memo: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Piece', PieceSchema);
