const {
  coalNameListServiceRead,
} = require("../coalnamelist/coalnamelist.service");
module.exports = {
  coalNameListController: (req, res) => {
    coalNameListServiceRead((err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      return res.status(200).json({ success: true, data: result });
    });
  },
};
