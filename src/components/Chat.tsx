import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { createForm } from '@tanstack/solid-form';

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: Date;
}

const users = ['Mati', 'Esther', 'Victor', 'Cake'];

export const Chat: Component = () => {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [currentUser, setCurrentUser] = createSignal('Mati');

  const form = createForm(() => ({
    defaultValues: {
      message: '',
    },
    onSubmit: async ({ value, formApi }) => {
      const newMessage: Message = {
        id: Date.now(),
        user: currentUser(),
        content: value.message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      formApi.reset();
    },
  }));

  const getUserColor = (username: string) => {
    const colors = [
      { text: 'text-red-500', border: 'border-red-500' },
      { text: 'text-yellow-500', border: 'border-yellow-500' },
      { text: 'text-blue-500', border: 'border-blue-500' },
      { text: 'text-purple-500', border: 'border-purple-500' },
      { text: 'text-pink-500', border: 'border-pink-500' },
      { text: 'text-orange-500', border: 'border-orange-500' },
      { text: 'text-cyan-500', border: 'border-cyan-500' },
    ];

    const userIndex = users.indexOf(username);
    return colors[userIndex % colors.length]!;
  };

  return (
    <div class="flex h-screen flex-col bg-black text-white">
      <div class="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-sm">
        <For each={messages()}>
          {(message) => (
            <div class="flex">
              <span class={`font-bold ${getUserColor(message.user).text}`}>
                {message.user}
              </span>
              <span class="mx-1 text-gray-500">:</span>
              <span class="text-white">{message.content}</span>
            </div>
          )}
        </For>
      </div>

      <div class="p-4">
        <div
          class={`flex items-center rounded border px-3 py-2 ${getUserColor(currentUser()).border}`}
        >
          <select
            class={`border-none bg-transparent text-xs outline-none ${getUserColor(currentUser()).text}`}
            value={currentUser()}
            onChange={(e) => setCurrentUser(e.target.value)}
          >
            <For each={users}>
              {(user) => (
                <option value={user} class="bg-black">
                  {user}
                </option>
              )}
            </For>
          </select>
          <span class={`mx-2 ${getUserColor(currentUser()).text}`}>|</span>
          <form
            class="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="message"
              children={(field) => (
                <input
                  class={`w-full flex-1 bg-transparent text-sm outline-none ${getUserColor(currentUser()).text} font-mono placeholder:text-gray-600`}
                  placeholder="Type a message..."
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.target.value)}
                />
              )}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
