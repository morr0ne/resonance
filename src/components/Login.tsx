import type { Component } from 'solid-js';
import { createForm } from '@tanstack/solid-form';
import { authClient } from '@/lib/auth-client';

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
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div class="flex max-w-3xl flex-col">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
