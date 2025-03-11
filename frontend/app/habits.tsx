/*type Habits = {
     title: string;
     description: string;
    }
    type HabitsProps = {
     habits: Habits[];
    }
    export default function Habits({habits}: HabitsProps) {
      console.log("habits    faslkf" + habits)
      if (!Array.isArray(habits)) {
        console.error("Habits is not an array:", habits)};
     return (      
     <ul>
     {habits.map((habit) => (
   <li key={habit.title}>{habit.title}</li>
     ))}
     </ul>
     );
     
}*/


   

  type Habit = {
      title: string;
      description: string;
      }
      type HabitsProps = {
      habits: Habit[];
      }
      export default function Habits({habits}: HabitsProps) {
      console.log('habits', habits)
      return (
      <ul>
      {
        habits?.habits?.map((habit:Habit) => (
      <li key={habit.title}>{habit.title}</li>
      ))}
      </ul>
      );
      }
      