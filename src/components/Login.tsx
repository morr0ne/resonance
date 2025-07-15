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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div class="flex max-w-md flex-col">
          <form.Field
            name="name"
            children={(field) => (
              <input
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
                type="password"
                placeholder="password"
                name={field().name}
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.value)}
              />
            )}
          />
        </div>
        <button class="cursor-pointer" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
