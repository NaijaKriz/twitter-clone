
import Notification from './../models/notification.model.js';
export const getNotifications = async (req, res) => {
    try {
        const userId =  req.user._id;
        const notification =  await Notification.find({to: userId})
        .populate({
            path:"from",
            select: "username profileImg"
        })

        await Notification.updateMany({to: userId}, {read: true});
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'internal server error', error });
    }
}

export const deleteNotification = async (req, res) => {
    try {
       const userId =  req.user._id;
       await Notification.deleteMany({to: userId});
       res.status(200).json({ message: 'Notifications deleted successfully' });
    } catch (error) {
        console.log('Error deleting notifications:', error.message);
        res.status(500).json({ message: 'Error deleting notification', error });
    }
}