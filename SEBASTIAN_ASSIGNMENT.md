# 🎮 Platformer Game Assignment for Sebastian

## Mission: Fix the Unreachable Platform in Level 2

### Problem Description
Players have reported that in Level 2, there's a platform that they cannot jump to. Your mission is to identify which platform is causing the problem and fix it so players can complete the level.

### Your Tasks

#### Task 1: Investigation (15 minutes)
1. **Run the game** and play through Level 2
   - Open `index.html` in your browser
   - Press 2 to go to Level 2
   - Try to jump to each platform
   - Identify which platform(s) you cannot reach

2. **Document your findings**:
   - Which platform is unreachable?
   - Where is it located (approximately)?
   - What happens when you try to jump to it?

#### Task 2: Code Analysis (20 minutes)
1. Open `js/Level.js` in your code editor
2. Find the Level 2 data (starting around line 26)
3. Look at the platform positions - they have `x` and `y` coordinates
4. Compare the unreachable platform's `y` position with:
   - The platform before it
   - The player's maximum jump height

**Hint**: Remember that in this game:
- Lower `y` values mean higher on the screen
- The player jumps with velocity -420 (see `js/config.js`)
- Gravity pulls the player down at 850

#### Task 3: Calculate the Fix (15 minutes)
1. Figure out the maximum height the player can jump
   - Look at the difference between platform heights in Level 1 for reference
   - A good rule: platforms shouldn't be more than 60-80 pixels apart vertically

2. Calculate a better `y` position for the problematic platform
   - Make sure it's reachable from the previous platform
   - Make sure the next platform is reachable from it

#### Task 4: Implement the Solution (10 minutes)
1. Edit the platform's `y` coordinate in `js/Level.js`
2. Save your changes
3. Refresh the game in your browser
4. Test that you can now reach the platform
5. Play through the entire level to make sure it's completable

### Bonus Challenges (Optional)
- [ ] Add a comment in the code explaining why you chose that specific height
- [ ] Test if the level is still fun and challenging after your fix
- [ ] Check if any stars need to be repositioned after moving the platform

### Testing Checklist
Before you're done, make sure:
- [ ] You can jump to every platform in Level 2
- [ ] You can collect all stars
- [ ] You can reach the flag and complete the level
- [ ] The level is still challenging but fair

### Submission
When you're finished:
1. Save your changes to `js/Level.js`
2. Write a brief summary below explaining:
   - Which platform was the problem
   - What was wrong with it
   - How you fixed it

---

## Your Solution Summary
(Write your answer here after completing the assignment)

**Problem Platform**:

**What was wrong**:

**How I fixed it**:

**New y-coordinate I used**:

---

### Teacher's Notes
This assignment practices:
- Debugging gameplay issues
- Understanding coordinate systems
- Problem-solving with constraints
- Testing and validation
- Code documentation

Good luck, Sebastian! Remember: great game designers iterate and test their changes! 🚀