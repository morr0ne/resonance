import type { Component } from 'solid-js';
import { createForm } from '@tanstack/solid-form';
import { authClient } from '@/utils/auth-client';

export const Login: Component = () => {
  const form = createForm(() => ({
    defaultValues: {
      email: 'contact@morrone.dev',
      password: '00000000',
      name: 'Mati',
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signUp.email({
        ...value,
      });

      console.log(data);
      console.log(error);
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <form.Field
          name="name"
          children={(field) => (
            <input
              class="input"
              placeholder="name"
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <input
              class="input"
              type="email"
              placeholder="email"
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <input
              class="input"
              type="password"
              placeholder="password"
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.target.value)}
            />
          )}
        />
        <button class="btn btn-neutral mt-4" type="submit">
          Login
        </button>
      </fieldset>
    </form>
  );
};
