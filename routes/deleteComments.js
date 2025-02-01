const express = require('express')
const router = express.Router()
const {commentModel} = require('../models/models')

router.delete('/deleteComment/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedComment = await commentModel.findByIdAndDelete(id);
      if (!deletedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
      }
      res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router