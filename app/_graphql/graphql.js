import gql from "graphql-tag"; 


export const SIGN_IN_MUTATION = gql`
  mutation SignInMutation($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      success
      token
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation MyMutation(
    $department: String!
    $email: String!
    $enrollmentNumber: String!
    $firstName: String!
    $lastName: String!
    $passoutYear: String!
    $password: String!
    $state: String!
    $username: String!
  ) {
    signup(
      department: $department
      email: $email
      enrollmentNumber: $enrollmentNumber
      firstName: $firstName
      lastName: $lastName
      passoutYear: $passoutYear
      password: $password
      state: $state
      username: $username
    ) {
      success
    }
  }
`;