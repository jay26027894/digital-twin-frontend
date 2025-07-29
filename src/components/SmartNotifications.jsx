import { Bell, AlertCircle, Info, Lightbulb } from 'lucide-react';

const SmartNotifications = ({ notifications, onDismiss, title = "Smart Alerts" }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-gray-400" size={20} />
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="text-center py-4 text-gray-500">
          <Bell size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">All caught up! No alerts right now.</p>
        </div>
      </div>
    );
  }

  const getNotificationIcon = (type) => {
    const iconMap = {
      warning: { icon: AlertCircle, color: 'text-orange-500' },
      info: { icon: Info, color: 'text-blue-500' },
      suggestion: { icon: Lightbulb, color: 'text-purple-500' },
      success: { icon: Bell, color: 'text-green-500' }
    };
    return iconMap[type] || iconMap.info;
  };

  const getNotificationStyle = (type) => {
    const styleMap = {
      warning: 'bg-orange-50 border-orange-200 border-l-4 border-l-orange-400',
      info: 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-400',
      suggestion: 'bg-purple-50 border-purple-200 border-l-4 border-l-purple-400',
      success: 'bg-green-50 border-green-200 border-l-4 border-l-green-400'
    };
    return styleMap[type] || styleMap.info;
  };

  const getActionButtonStyle = (type) => {
    const styleMap = {
      warning: 'text-orange-600 hover:text-orange-700 hover:bg-orange-100',
      info: 'text-blue-600 hover:text-blue-700 hover:bg-blue-100',
      suggestion: 'text-purple-600 hover:text-purple-700 hover:bg-purple-100',
      success: 'text-green-600 hover:text-green-700 hover:bg-green-100'
    };
    return styleMap[type] || styleMap.info;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="text-gray-400" size={20} />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-3">
        {notifications.map((notif, idx) => {
          const { icon: Icon, color } = getNotificationIcon(notif.type);
          return (
            <li
              key={notif.id || idx}
              className={`flex items-start gap-3 p-3 rounded-lg border ${getNotificationStyle(notif.type)}`}
            >
              <span className={`mt-1 ${color}`}>
                <Icon size={20} />
              </span>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{notif.title}</div>
                {notif.message && (
                  <div className="text-sm text-gray-600">{notif.message}</div>
                )}
              </div>
              {onDismiss && (
                <button
                  onClick={() => onDismiss(notif)}
                  className={`ml-2 px-2 py-1 rounded transition ${getActionButtonStyle(notif.type)}`}
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SmartNotifications;