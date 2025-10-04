// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const AdminHeroSection = () => {
//   // Chart Data
//   const trafficData = {
//     labels: ['USA', 'Europe', 'India', 'Australia', 'Others'],
//     datasets: [
//       {
//         data: [35, 25, 20, 10, 10],
//         backgroundColor: [
//           '#3B82F6',
//           '#10B981',
//           '#F59E0B',
//           '#6366F1',
//           '#EC4899',
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const performanceData = {
//     labels: ['Success', 'Warning', 'Error'],
//     datasets: [
//       {
//         data: [75, 15, 10],
//         backgroundColor: [
//           '#10B981',
//           '#F59E0B',
//           '#EF4444',
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Stats Data
//   const stats = [
//     { title: 'Total customers', value: '24,532', change: '+12%', positive: true },
//     { title: 'Revenue', value: '$12,345', change: '+8%', positive: true },
//     { title: 'projects', value: '532+', change: '-5%', positive: false },
//     { title: 'complete Projects', value: '450+', change: '+2%', positive: true },
//   ];

//   // Todo List Data
//   const [todos, setTodos] = React.useState([
//     { id: 1, task: 'Call John for Dinner', completed: false },
//     { id: 2, task: 'Book Boss Flight', completed: true },
//     { id: 3, task: 'Hit the Gym', completed: false },
//     { id: 4, task: 'Give Purchase Report', completed: false },
//     { id: 5, task: 'Review Project Docs', completed: false },
//   ]);

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   // Activity Feed Data
//   const activities = [
//     { id: 1, user: 'John Doe', action: 'created new project', time: '2 min ago', avatar: 'JD' },
//     { id: 2, user: 'Jane Smith', action: 'updated dashboard', time: '10 min ago', avatar: 'JS' },
//     { id: 3, user: 'Robert Johnson', action: 'completed task', time: '1 hour ago', avatar: 'RJ' },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-sm p-6 text-white">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-2xl font-bold">Welcome back ! <br /></h2>
//             <p className="mt-2 opacity-90 max-w-md">
//               If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
//             </p>
           
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-blue-400 bg-opacity-10 p-4 rounded-lg">
//               <p className="text-sm opacity-80">Total active users</p>
//               <p className="text-2xl font-bold mt-1">18,765</p>
//               <p className="text-sm text-green-300 mt-1">+2.6% last 7 days</p>
//             </div>
            
//             <div className="bg-blue-400 bg-opacity-10 p-4 rounded-lg">
//               <p className="text-sm opacity-80">Total installed</p>
//               <p className="text-2xl font-bold mt-1">4,876</p>
//               <p className="text-sm text-green-300 mt-1">+0.2% last 7 days</p>
//             </div>
            
//             <div className="bg-blue-400 bg-opacity-10 p-4 rounded-lg">
//               <p className="text-sm opacity-80">Total downloads</p>
//               <p className="text-2xl font-bold mt-1">678</p>
//               <p className="text-sm text-red-300 mt-1">-0.1% last 7 days</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured App Card */}


//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
//             <div className="mt-2 flex items-baseline">
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
//               <span className={`ml-2 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
//                 {stat.change}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Traffic Pie Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
//           <div className="h-64">
//             <Pie 
//               data={trafficData}
//               options={{
//                 plugins: {
//                   legend: {
//                     position: 'right',
//                     labels: {
//                       usePointStyle: true,
//                       padding: 20,
//                       color: '#6B7280',
//                     },
//                   },
//                 },
//                 maintainAspectRatio: false,
//               }}
//             />
//           </div>
//         </div>

//         {/* Performance Pie Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Performance</h3>
//           <div className="h-64">
//             <Pie 
//               data={performanceData}
//               options={{
//                 plugins: {
//                   legend: {
//                     position: 'bottom',
//                     labels: {
//                       usePointStyle: true,
//                       padding: 20,
//                       color: '#6B7280',
//                     },
//                   },
//                 },
//                 maintainAspectRatio: false,
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Todo List */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tasks</h3>
//             <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
//               View All
//             </button>
//           </div>
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {todos.map((item) => (
//               <li key={item.id} className="py-3 flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={item.completed}
//                   onChange={() => toggleTodo(item.id)}
//                   className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className={`ml-3 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
//                   {item.task}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
//           <div className="space-y-4">
//             {activities.map((activity) => (
//               <div key={activity.id} className="flex items-start">
//                 <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
//                   <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
//                     {activity.avatar}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">
//                     {activity.user} {activity.action}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHeroSection;
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHeroSection = () => {
  // ... (keep your existing chart data and state)
   const trafficData = {
    labels: ['USA', 'Europe', 'India', 'Australia', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#6366F1',
          '#EC4899',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Success', 'Warning', 'Error'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          '#10B981',
          '#F59E0B',
          '#EF4444',
        ],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

  // Stats Data
  const stats = [
    { title: 'Total Company', value: '24,532', change: '+12%', positive: true },
    { title: 'Total Mategory', value: '$12,345', change: '+8%', positive: true },
    { title: 'Total Modules', value: '532+', change: '-5%', positive: false },
    { title: 'Total Users', value: '450+', change: '+2%', positive: true },
  ];

  // Todo List Data
  const [todos, setTodos] = React.useState([
    { id: 1, task: 'Call John for Dinner', completed: false },
    { id: 2, task: 'Book Boss Flight', completed: true },
    { id: 3, task: 'Hit the Gym', completed: false },
    { id: 4, task: 'Give Purchase Report', completed: false },
    { id: 5, task: 'Review Project Docs', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Activity Feed Data
  const activities = [
    { id: 1, user: 'John Doe', action: 'created new project', time: '2 min ago', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', action: 'updated dashboard', time: '10 min ago', avatar: 'JS' },
    { id: 3, user: 'Robert Johnson', action: 'completed task', time: '1 hour ago', avatar: 'RJ' },
  ];

  return (
    <div className="space-y-3 p-2">
      {/* Welcome Banner - made more compact */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-sm p-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-3 md:mb-0">
            <h2 className="text-xl font-bold">Welcome back!</h2>
            <p className="text-sm opacity-90 mt-1">
              If you are going to use a passage of Lorem Ipsum...
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <p className="text-xs opacity-80">Active users</p>
              <p className="text-lg font-bold">18,765</p>
              <p className="text-xs text-green-300">+2.6%</p>
            </div>
            
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <p className="text-xs opacity-80">Installed</p>
              <p className="text-lg font-bold">4,876</p>
              <p className="text-xs text-green-300">+0.2%</p>
            </div>
            
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <p className="text-xs opacity-80">Downloads</p>
              <p className="text-lg font-bold">678</p>
              <p className="text-xs text-red-300">-0.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - made more compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-lg font-semibold">{stat.value}</p>
              <span className={`ml-1 text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - adjusted spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:col-span-2">
          <h3 className="text-md font-medium mb-2">Traffic Sources</h3>
          <div className="h-48">
            <Pie data={trafficData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-md font-medium mb-2">System Performance</h3>
          <div className="h-48">
            <Pie data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Section - adjusted spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-medium">Tasks</h3>
            <button className="text-xs text-blue-600 hover:text-blue-500">
              View All
            </button>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map((item) => (
              <li key={item.id} className="py-2 flex items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`ml-2 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {item.task}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-md font-medium mb-2">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
                    {activity.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium">
                    {activity.user} {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroSection;