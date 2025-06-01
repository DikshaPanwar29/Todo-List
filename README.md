# Todo-List
A React To-Do List component allowing task addition, removal, and completion marking.
1. Initial Load
Open the app in the browser.
Verify the To-Do List icon appears nicely next to the title.
Check that previously saved tasks load from localStorage.

2. Add Task
Enter a valid task and click Add.
Confirm the task appears in the list.
A green popup message “Task added!” should appear briefly at top-right.

Try adding invalid tasks like empty string, very short, too long, or invalid characters; check appropriate error messages appear.

3. Mark Task Complete
Click on a task text to toggle completion.
The task text should visually change.
A green popup “Task marked as completed!” should appear briefly.

4. Remove Task
Click the remove button (×) on a task.
The task should be removed from the list.
A green popup “Task removed!” should appear briefly.

5. Filtering
Use the filter buttons (All, Active, Completed).
Verify tasks shown correspond correctly to the filter.

6. Persistence
Refresh the page.
Confirm that tasks and their completion status persist due to localStorage.

7. Edge Cases
Add tasks with similar names but different casing — check for duplicates.
Try rapid adding/removing to see if UI updates smoothly.
Test on different screen sizes for responsive behavior.
