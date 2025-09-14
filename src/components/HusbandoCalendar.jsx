import { useState } from 'preact/hooks';

export default function HusbandoCalendar({ husbandos }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Filter husbandos for current month
  const currentMonthHusbandos = husbandos.filter(h => h.month === currentMonth);
  
  // Group husbandos by day
  const husbandosByDay = {};
  currentMonthHusbandos.forEach(h => {
    if (!husbandosByDay[h.day]) {
      husbandosByDay[h.day] = [];
    }
    husbandosByDay[h.day].push(h);
  });
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-lg">
        <button 
          onClick={goToPreviousMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          ← Previous
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button 
            onClick={goToToday}
            className="text-blue-600 underline text-sm mt-1"
          >
            Go to Today
          </button>
        </div>
        
        <button 
          onClick={goToNextMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next →
        </button>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`min-h-24 border border-gray-200 p-1 ${
              day ? 'bg-white' : 'bg-gray-50'
            } ${
              day && new Date().getDate() === day && 
              new Date().getMonth() === currentMonth && 
              new Date().getFullYear() === currentYear 
                ? 'ring-2 ring-blue-400 bg-blue-50' 
                : ''
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {day}
                </div>
                {husbandosByDay[day] && (
                  <div className="space-y-1">
                    {husbandosByDay[day].map(husbando => (
                      <a
                        key={husbando.id}
                        href={`/husbandos/${husbando.id}/`}
                        className="block bg-pink-100 hover:bg-pink-200 transition-colors rounded px-1 py-0.5"
                      >
                        <div className="text-xs font-medium text-pink-800 leading-tight">
                          {husbando.name}
                        </div>
                        <div className="text-xs text-pink-600 leading-tight">
                          {husbando.series}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Birthday List for Current Month */}
      {currentMonthHusbandos.length > 0 && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Birthdays in {monthNames[currentMonth]}
          </h3>
          <div className="space-y-2">
            {currentMonthHusbandos
              .sort((a, b) => a.day - b.day)
              .map(husbando => (
                <div key={husbando.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {husbando.day}
                  </div>
                  <a 
                    href={`/husbandos/${husbando.id}/`}
                    className="flex-1 hover:text-blue-600 transition-colors"
                  >
                    <span className="font-medium">{husbando.name}</span>
                    <span className="text-gray-600 ml-2">({husbando.series})</span>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}