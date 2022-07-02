require('dotenv').config();
console.log(process.env.TEST_HOST);

function sayMyName(name: string): void {
  if (name === "Heisenberg") {
    console.log("You're right DDD 👍");
  } else {
    console.log("You're wrong 👎");
  }
}
 
sayMyName("Heisenberg");
