"use client"

import { Button } from '@/components/ui/button';
import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SIGN_OUT_MUTATION = gql`
  mutation SignOutMutation {
    signout {
      success
    }
  }
`;

export default function Signout() {
  const [signOutMutation, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: (data) => {
      // Handle successful sign-out
      const { success } = data.signout;
      if (success) {
        // Redirect or perform actions on successful sign-out
        console.log('Successfully signed out!');
      } else {
        // Handle failed sign-out
        console.error('Sign-out failed');
      }
    },
  });

  const handleSignOut = () => {
    signOutMutation();
  };

  return (
    <div>
      <Button onClick={handleSignOut} disabled={loading}>
        Sign Out
      </Button>
    </div>
  );
}
