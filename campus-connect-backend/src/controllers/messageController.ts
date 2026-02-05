import { Request, Response } from 'express';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user conversations
// @route   GET /api/messages/conversations
// @access  Private
export const getConversations = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const conversations = await Conversation.find({
         participants: authReq.user?._id,
      })
         .populate('participants', 'name avatar email')
         .sort({ lastMessageTime: -1 });

      res.status(200).json({
         success: true,
         data: conversations,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Get messages in a conversation
// @route   GET /api/messages/conversation/:id
// @access  Private
export const getMessages = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const messages = await Message.find({
         conversation: authReq.params.id,
      })
         .populate('sender', 'name avatar')
         .sort({ createdAt: 1 });

      res.status(200).json({
         success: true,
         data: messages,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const { recipientId, text } = authReq.body;

      // Find or create conversation
      let conversation = await Conversation.findOne({
         participants: { $all: [authReq.user?._id, recipientId] },
      });

      if (!conversation) {
         conversation = await Conversation.create({
            participants: [authReq.user?._id, recipientId],
         });
      }

      // Create message
      const message = await Message.create({
         conversation: conversation._id,
         sender: authReq.user?._id,
         text,
      });

      // Update conversation
      conversation.lastMessage = text;
      conversation.lastMessageTime = new Date();
      await conversation.save();

      const populatedMessage = await Message.findById(message._id).populate(
         'sender',
         'name avatar'
      );

      res.status(201).json({
         success: true,
         data: populatedMessage,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};
