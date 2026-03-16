// 3. Write the simplest code to pass the tests
function validatePassword(password) {
  // Check length (at least 8 characters)
  if (password.length < 8) {
    return false;
   }
  
  // Check if it contains at least one number
  if (!/\d/.test(password)) {
    return false;
  }
  
  return true;
}

export default validatePassword;

// 4. Run the tests again - they should pass now

// 5. Refactor if needed, then repeat for new requirements