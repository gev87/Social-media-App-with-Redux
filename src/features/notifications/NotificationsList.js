import { useDispatch, useSelector } from 'react-redux';
import { allNotificationsRead, selectAllNotifications } from './notificationsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useLayoutEffect } from 'react';
import classnames from 'classnames';

function NotificationsList() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  console.log('Rendering notifications list');

 useLayoutEffect(() => {
    console.log("marking all notifications as read");
    dispatch(allNotificationsRead());
  }, [dispatch]);

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    };

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
}

export default NotificationsList;
