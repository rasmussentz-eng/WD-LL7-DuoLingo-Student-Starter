/* ================================================================
   DEVSHOP CHALLENGE — INSTRUCTOR SOLUTION
   ================================================================
   This solution builds the ⭐ XP & Scoring System feature, and also
   demonstrates the 🎁 Random Rewards array logic (Step 3) so you
   have a reference for every required element in one file.

   Use this to:
     - Show a finished example during Showcase if needed

   This mirrors the same 8-step structure as the starter file —
   nothing here should look unfamiliar to students.
================================================================ */


/* ----------------------------------------------------------------
   STEP 1: GRAB DOM ELEMENTS
---------------------------------------------------------------- */
const statLabel = document.getElementById("statLabel");
const statValue = document.getElementById("statValue");
const message = document.getElementById("message");
const answerBtn = document.getElementById("answerBtn");
const resetBtn = document.getElementById("resetBtn");
const devLog = document.getElementById("devLog");

// Update the label so the UI matches the feature we picked.
statLabel.textContent = "XP";


/* ----------------------------------------------------------------
   STEP 2: GAME STATE VARIABLE
   ----------------------------------------------------------------
   We picked XP & Scoring, so our state variable is `xp`.
   It starts at 0 and increases as the player answers correctly.
---------------------------------------------------------------- */
let xp = 0;
const STARTING_XP = 0; // kept separate so Reset (Step 7) always matches Step 2


/* ----------------------------------------------------------------
   STEP 3: ARRAY OF POSSIBLE VALUES
   ----------------------------------------------------------------
   Even though our core feature is XP, we're using an array here
   to decide HOW MUCH xp is earned per correct answer — this is
   the same array pattern a Random Rewards team would use.

   Math.random() + Math.floor() picks a random index from this
   array, so the amount of XP earned varies each time.
---------------------------------------------------------------- */
const xpRewards = [5, 10, 15, 25]; // small, medium, big, jackpot


/* ----------------------------------------------------------------
   STEP 4: SIMULATE A CORRECT/INCORRECT ANSWER
   ----------------------------------------------------------------
   Unchanged from the starter file — this is provided so students
   can test their logic without building a real quiz.
---------------------------------------------------------------- */
function isAnswerCorrect() {
  return Math.random() > 0.5;
}


/* ----------------------------------------------------------------
   STEP 5: CORE GAME LOGIC
   ----------------------------------------------------------------
   Our IF -> THEN plan:

     IF the answer is correct
     THEN earn a random amount of XP and show encouragement

     IF the answer is incorrect
     THEN earn no XP and prompt the player to try again

     IF xp crosses a milestone (50, 100)
     THEN show progressively bigger celebration messages
---------------------------------------------------------------- */
function handleAnswer() {

  const correct = isAnswerCorrect();

  // ----- Correct / incorrect branch -----
  // This updates state based on the MOST RECENT action.
  if (correct) {
    // Pick a random reward amount from our array (Step 3 in action).
    const randomIndex = Math.floor(Math.random() * xpRewards.length);
    const earnedXP = xpRewards[randomIndex];

    xp += earnedXP; // shorthand for: xp = xp + earnedXP
    message.textContent = `Correct! You earned +${earnedXP} XP.`;
  } else {
    message.textContent = "Not quite — try again! (no XP lost)";
  }

  // ----- Milestone branch -----
  // This reacts to the CURRENT STATE, not just the last answer.
  // Notice this is a SEPARATE if/else chain from the one above —
  // two different decisions are being made here.
  if (xp >= 100) {
    message.textContent = "🎉 Level Up! You hit 100 XP!";
  } else if (xp >= 50) {
    message.textContent += " You're halfway to leveling up!";
  } else if (xp <= 0) {
    message.textContent += " Let's get your first points on the board.";
  }

  // ----- Update the screen (Step 6) -----
  statValue.textContent = xp;

  // ----- Dev console (for the team, not the player) -----
  console.log("XP:", xp, "| Correct?", correct);
  devLog.textContent = `xp = ${xp} | last answer correct = ${correct}`;
}


/* ----------------------------------------------------------------
   STEP 7: RESET BUTTON
   ----------------------------------------------------------------
   State first, then UI — same order every time.
---------------------------------------------------------------- */
function handleReset() {
  xp = STARTING_XP;

  statValue.textContent = xp;
  message.textContent = "Press \"Answer\" to begin!";
  devLog.textContent = "Waiting for input...";

  console.log("Game state reset.");
}


/* ----------------------------------------------------------------
   STEP 8: EVENT LISTENERS
---------------------------------------------------------------- */
answerBtn.addEventListener("click", handleAnswer);
resetBtn.addEventListener("click", handleReset);


/* ================================================================
   ✅ REQUIRED ELEMENTS CHECK (all satisfied above)
   ================================================================
   [x] One state variable: xp
   [x] 2+ comparison operators: >=, <=
   [x] if / else if / else chain with 3+ outcomes (milestone branch)
   [x] Array used for randomness: xpRewards
   [x] Feedback message updates for the player
   [x] statLabel renamed to match the feature
   [x] Reset button returns everything to start values
================================================================ */
