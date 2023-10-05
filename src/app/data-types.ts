/**
 * Represents the data required for a user to sign up.
 */
export interface SignUp {
  /** The name of the user. */
  name: string;
  /** The email address of the user. */
  email: string;
  /** The password for the user's account. */
  password: string;
}

/**
 * Represents the Login data type.
 */
export interface Login {
  /**
   * The email of the user.
   */
  email: string;
  /**
   * The password of the user.
   */
  password: string; 
}
