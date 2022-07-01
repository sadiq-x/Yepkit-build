import User from '../../src/entities/user.js';


/**
 * Initialize the root user if it does not exists yet.
 * This is a seed user for which the password must be changed once 
 * it's deployed.
 */
export default async function () {
  // Check if the root user already exists in the database.
  const user = new User();
  try {
    const result = await user.fetchByEmail('root@yepkit.com');
    if (result) {
      return;
    }
  } catch (err) {
    console.log(Date.now(), 'ERROR: Unable to check is root user exists');
  }
  console.log(Date.now(), ' Creating the root user');
  user.setEmail('root@yepkit.com');
  user.setFirstName('root');
  try {
    await user.setPassword('YepkitTemp1');
  } catch (err) {
    console.log(err);
    console.log(Date.now(), ' WARNING: App is running without a root user!');
    return;
  }
  user.setRole('super-admin');
  await user.persist();
}


