
      
    type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}
type HabitState = {
    habits: Habit[];
}

export default function Habits({habits}: HabitState) {

 return (
 <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
 <h1 className="text-2xl font-bold mb-4 text-black">Habits</h1>
 <ul className="space-y-4">
    {habits?.habits?.map((habit:Habit) => (
    <li className="flex items-center justify-between" key={habit._id}>
    <span className="text-black">{habit.title}</span>
    <div className="flex items-center space-x-2">
    <progress className="w-24" value="70" max="100"></progress>

    <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded" >Done</button> 


 </div>
 </li>


 ))}
 </ul>
 </div>
 );
} 